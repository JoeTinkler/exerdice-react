import { useState, useEffect, useRef, useContext } from 'react'
import DiceBox from "@3d-dice/dice-box";
import styled, { useTheme } from 'styled-components';
import { Button } from './ui/common/Button';
import { ProfileContext } from '@providers/profile';

/*  --------------- DICE BOX -------------- */
// Note the dice-box assets in the public folder.
// Those files are all necessary for the web workers to function properly
// create new DiceBox class


export const DiceContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  pointer-events: none;
  z-index: 1;

  canvas {
    width: 100%;
    height: 100%;
    transition: opacity 1s;
    opacity: 1;
  }

  canvas.transparent {
    opacity: 0;
  }
`;

export const DoneButton = styled(Button)`
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100vw - 60px);
  margin: 30px;
  z-index: 2;
`;

let Dice: DiceBox | null = null;

export const Dicer: React.FC = () => {
  const { profile } = useContext(ProfileContext);
  const [rollResult, setRollResult] = useState<string>();
  const theme = useTheme();

  // create a ref so the Dice Box doesn't try to reinitialize every time the App rerenders.
  const initialized = useRef(false)

  useEffect(()=> {
    if(!initialized.current){
      initialized.current = true;
      Dice = new DiceBox({
        container: '#dice-box-container',
        assetPath: "/assets/",
        throwForce: 3,
        scale: 5,
        themeColor: theme.highlightColour,
      });
      Dice.init();

      Dice.onRollComplete = (results) => {
        console.log('results', results)
        if (results.length === 1) {
          Dice?.add(`${results[0].value}d${profile.exerciseDiceSize}`);
        }
        setRollResult(results.map(result => result.value).join(', '));
      }
    }
  },[])

  const handleRoll = () => {
    Dice?.roll(`1d${profile.modifierDiceSize}`);
  }

  const handleClick = () => {
    Dice?.clear();
    setRollResult(undefined);
  }

  return (
    <>
      <DiceContainer id="dice-box-container" onClick={handleClick}></DiceContainer>
      <Button type='submit' onClick={handleRoll}>Roll</Button>
      {rollResult && <DoneButton type='submit' onClick={handleClick}>Done</DoneButton>}
      <span id='result'>Result: {rollResult}</span>
    </>
  )
}