import styled from "styled-components";

export const Dice = styled.div<{ $shape?: 'd20'| 'd8' | 'd6' | 'd4', $highlight?: boolean}>`
  ${({ $shape }) => {
    switch ($shape) {
      case 'd20':
        return `clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);`;
      case 'd8':
        return `clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);`;
      case 'd6':
        return `clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);`;
      case 'd4':
        return `clip-path: polygon(50% 0%, 100% 90%, 0% 90%);`;
    }
  }}
  font-size: 32px;
  font-weight: bold;
  background: ${({ theme, $highlight }) => $highlight ? theme.highlightColour: theme.dice.background};
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  color: ${({ theme, $highlight }) => $highlight ? theme.dice.colour : theme.highlightColour};
  margin: 15px 5px
`;

export const diceShape = (size: number) => {
  switch (size) {
    case 4: return 'd4';
    case 20: return 'd20';
    default:
    case 6: return 'd6';
  }
}