import { Button } from "@components/ui/common/Button";
import { Row } from "@components/ui/common/Layout";
import { toRGBA } from "@helpers/colour";
import { daysBetween, sameDayUnix } from "@helpers/date";
import { completedPercent } from "@helpers/rolls";
import { useActivities } from "@hooks/useActivities";
import { useRests } from "@hooks/useRests";
import { useRolls } from "@hooks/useRolls";
import styled, { keyframes } from "styled-components";

const CalendarWrapper = styled.div`
  padding: 10px 0;
  text-align: center;
`;

const MonthRow = styled(Row)`
  margin: 0;
  justify-content: center;
  gap: 15px;
`;

const Month = styled.h2`
  margin: 10px 0;
  color: ${({ theme }) => theme.highlightColour};
`;

const NavButton = styled(Button)`
  padding: 2px;
  width: 30px;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  padding: 0 15px;
`;

const MoveBackground = keyframes`
  0% { background-position: 0% 30% }
  50% { background-position: 50% 30% }
  100% { background-position: 0% 30% }
`;

const Day = styled.div<{ $data?: DayData }>`
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
  animation-name: ${MoveBackground};
  animation-duration: 12s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;

type DayData = {
  active: boolean;
  percentage: number;
  rest: boolean;
  year: number;
  month: number;
  day: number;
}

type PropTypes = {
  month: number;
  year: number;
  day: number;
  onSelect: (day: number | undefined, month: number, year: number) => void
}

const addDays = (date: Date, days: number) => new Date(date.getTime() + (24 * 60 * 60 * 1000 * days));

export const Calendar: React.FC<PropTypes> = ({ month, year, day, onSelect }) => {
  const startOfMonth = new Date(year, month, 1);
  const startDay = addDays(startOfMonth, startOfMonth.getDay() * -1);
  const daysInMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth()+1, 0).getDate();
  const calendarDayCount = Math.ceil((daysBetween(startDay, startOfMonth) + daysInMonth) / 7) * 7;
  const end = addDays(startDay, calendarDayCount + 1).getTime();
  const { activities, loading: activitiesLoading, error: activitiesError } = useActivities(startDay.getTime(), end);
  const { rolls, loading: rollsLoading, error: rollsError } = useRolls(startDay.getTime(), end);
  const { rests, loading: restsLoading, error: restsError } = useRests(startDay.getTime(), end);
  const days = Array.from(Array(isNaN(calendarDayCount) ? 0 : calendarDayCount)).map((_, i) => {
    const date = addDays(startDay, i);
    const rest = rests.some((r) => sameDayUnix(r.timestamp, date.getTime()));
    const data: DayData = {
      active: year === date.getFullYear() && month === date.getMonth() && day === date.getDate(),
      percentage: 0,
      rest: false,
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate()
    }
    if (rest) {
      return { ...data, rest: true };
    }
    const roll = rolls.find((r) => r.timestamp >= date.getTime() && r.timestamp < addDays(date, 1).getTime());
    if (roll) {
      const dayActivities = activities.filter((e) => e.timestamp >= date.getTime() && e.timestamp < addDays(date, 1).getTime()) ?? [];
      return { ...data, percentage: completedPercent(roll, dayActivities) };
    }
    return data;
  });

  return (
    <CalendarWrapper>
      <MonthRow>
        <NavButton onClick={() => onSelect(undefined, month - 1, year)}>{'<'}</NavButton>
        <Month>{startOfMonth.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</Month>
        <NavButton onClick={() => onSelect(undefined, month + 1, year)}>{'>'}</NavButton>
      </MonthRow>
      <CalendarGrid>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <Day key={d}>
            {d[0]}
          </Day>
        ))}
        {days.map((d) => (<Day key={`${d.month}/${d.day}`} $data={d} onClick={() => onSelect(d.day, d.month, d.year)}>{d.day}</Day>))}
      </CalendarGrid>
    </CalendarWrapper>
  );
}