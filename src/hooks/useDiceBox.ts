import { ProfileContext } from "@providers/profile";
import { useContext, useEffect, useRef, useState } from "react";
import { DayRollState } from "./useTodaysRoll";
import { useTheme } from "styled-components";
import DiceBox from "@3d-dice/dice-box";
import { unixTimestamp } from "@helpers/date";

let Dice: DiceBox | null = null;

export const useDiceBox = (containerId: string) => {
  const { profile } = useContext(ProfileContext);
  const [rollResult, setRollResult] = useState<DayRollState>();
  const theme = useTheme();

  // create a ref so the Dice Box doesn't try to reinitialize every time the App rerenders.
  const initialized = useRef(false);

  useEffect(()=> {
    if(!initialized.current){
      initialized.current = true;
      Dice = new DiceBox({
        container: containerId,
        assetPath: "/assets/",
        theme: 'default-extras',
        throwForce: 3,
        scale: 5,
        themeColor: theme.highlightColour,
      });
      Dice.init();

      Dice.onRollComplete = (results) => {
        if (results.length === 1) {
          Dice?.add(`${results[0].value}d${profile.exerciseDiceSize}`);
        }
        if (results.length === 2) {
          setRollResult({
            timestamp: unixTimestamp(),
            modifierRoll: {
              value: results[0].value,
              max: results[0].sides
            },
            activityRolls: results[1].rolls.map((r) => ({ value: r.value, max: r.sides }))
          });
          setTimeout(clear, 1000);
        }
      }
    }
  },[])

  const roll = () => {
    Dice?.show();
    Dice?.roll(`1d${profile.modifierDiceSize}`);
  }

  const clear = () => {
    Dice?.hide('transparent');
    setRollResult(undefined);
  }

  return { rollResult, roll, clear };
}