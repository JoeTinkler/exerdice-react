import styled, { keyframes } from "styled-components";
import { Row } from "./common/Layout";
import { Button } from "./common/Button";
import { toRGBA } from "@helpers/colour";

export const CalendarWrapper = styled.div`
  padding: 10px 0;
  text-align: center;
`;

export const MonthRow = styled(Row)`
  margin: 0;
  justify-content: center;
  gap: 15px;
`;

export const Month = styled.h2`
  margin: 10px 0;
  color: ${({ theme }) => theme.highlightColour};
`;

export const NavButton = styled(Button)`
  padding: 2px;
  width: 30px;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  padding: 0 15px;
`;

export const MoveBackground = keyframes`
  0% { background-position: 0% 30% }
  50% { background-position: 50% 30% }
  100% { background-position: 0% 30% }
`;

export type DayData = {
  active: boolean;
  percentage: number;
  rest: boolean;
  year: number;
  month: number;
  day: number;
}

export const Day = styled.div<{ $data?: DayData }>`
  padding: 12px;
  border-radius: 10px;
  background: ${({ theme, $data}) => {
    if ($data?.active) {
      return theme.highlightColour;
    }
    if ($data?.rest) {
      return theme.calendar.restBackground;
    }
    if (($data?.percentage ?? 0) >= 100) {
      return 'linear-gradient(to right, #e1b136, #ffd86e, #eab630)';
    }
    return ($data?.percentage ?? 0) > 0 ? toRGBA(theme.calendar.background!, $data?.percentage! / 100)  : theme.calendar.secondaryBackground;
  }};
  color: ${({ theme, $data }) => {
    if ($data?.active) {
      return theme.colour;
    }
    if ($data?.rest) {
      return theme.calendar.restColour;
    }
    return ($data?.percentage ?? 0) > 0 ? theme.calendar.colour : theme.calendar.secondaryColour;
  }};
  text-align: center;
  background-size: 150%;
  animation: ${MoveBackground}; 12s ease-in-out infinite;
`;