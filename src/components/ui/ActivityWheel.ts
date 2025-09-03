import styled from "styled-components";
import { Row } from "@components/ui/common/Layout";
import { ActivityIcon } from "@components/activity/ActivityIcon";

export const WheelContainer = styled.div<{ $items: number }>`
  all: unset;
  aspect-ratio: 1 / 1;
  container-type: inline-size;
  direction: ltr;
  display: grid;
  position: relative;
  width: 100%;
  overflow: hidden;
  margin: 20px 0;
  &::after {
    aspect-ratio: 1/cos(${props => 360 / props.$items}deg);
    background-color: crimson;
    clip-path: polygon(50% 100%,100% 0,0 0);
    content: "";
    height: 4cqi;
    position: absolute;
    place-self: start center;
    scale: 1.4;
  }
`;

export const Wheel = styled.ul<{ $rotation: number }>`
  all: unset;
  clip-path: inset(0 0 0 0 round 50%);
  display: grid;
  inset: 0;
  place-content: center start;
  transition: transform 4s cubic-bezier(0.440, -0.205, 0.000, 1.130);
  animation: spin 4s linear infinite;
  transform: rotate(${(props) => props.$rotation}deg);
`;

export const WheelItem = styled.li<{ $items: number, $index: number }>`
  align-content: center;
  aspect-ratio: 1 / calc(2 * tan(180deg / ${props => props.$items}));
  color: #000;
  background: hsl(${({ $items, $index }) => ((360 / $items) * $index) + 90}deg, 100%, 75%);
  clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
  display: grid;
  font-size: 5cqi;
  grid-area: 1 / -1;
  padding-left: 1ch;
  rotate: ${({ $items, $index }) => ((360 / $items) * $index) + 90}deg;
  transform-origin: center right;
  user-select: none;
  width: 50cqi;
`;

export const WheelLabelWrapper = styled(Row)`
  margin: 0;
`
export const WheelIcon = styled(ActivityIcon)`
  color: #000;
`;