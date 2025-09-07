import { addDaysUnix, daysBetween, sameDayUnix } from "@helpers/date";
import { completedPercent } from "@helpers/rolls";
import { useActivities } from "@hooks/useActivities";
import { useRests } from "@hooks/useRests";
import { useRolls } from "@hooks/useRolls";
import { ProfileContext } from "@providers/profile";
import { useContext, useEffect } from "react";
import { CalendarGrid, CalendarWrapper, Day, DayData, Month, MonthRow, NavButton } from "./ui/Calendar";

type PropTypes = {
  month: number;
  year: number;
  day: number;
  onSelect: (day: number | undefined, month: number, year: number) => void
}

const addDays = (date: Date, days: number) => new Date(date.getTime() + (24 * 60 * 60 * 1000 * days));

export const Calendar: React.FC<PropTypes> = ({ month, year, day, onSelect }) => {
  const { profile } = useContext(ProfileContext);
  const startOfMonth = new Date(year, month, 1);
  const startDay = addDays(startOfMonth, startOfMonth.getDay() * -1);
  const startTime = startDay.getTime() + (profile.startOfDayOffset ?? 0);
  const daysInMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth()+1, 0).getDate();
  const calendarDayCount = Math.ceil((daysBetween(startDay, startOfMonth) + daysInMonth) / 7) * 7;
  const end = addDaysUnix(startTime, calendarDayCount + 1);
  const { activities, loading: activitiesLoading, error: activitiesError, setFilters: setActivityFilters } = useActivities(startTime, end);
  const { rolls, loading: rollsLoading, error: rollsError, setFilters: setRollFilters } = useRolls(startTime, end);
  const { rests, loading: restsLoading, error: restsError, setFilters: setRestFilters } = useRests(startTime, end);

  const days = Array.from(Array(isNaN(calendarDayCount) ? 0 : calendarDayCount)).map((_, i) => {
    const date = addDays(startDay, i);
    const time = date.getTime() + (profile.startOfDayOffset ?? 0)
    const rest = rests.some((r) => sameDayUnix(r.timestamp, time));
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
    const roll = rolls.find((r) => r.timestamp >= time && r.timestamp < addDaysUnix(time, 1));
    if (roll) {
      const dayActivities = activities.filter((e) => e.timestamp >= date.getTime() && e.timestamp < addDays(date, 1).getTime()) ?? [];
      return { ...data, percentage: completedPercent(roll, dayActivities) };
    }
    return data;
  });

  useEffect(() => {
    setActivityFilters({ start: startTime, end});
    setRollFilters({ start: startTime, end});
    setRestFilters({ start: startTime, end});
  }, [month, day, year]);

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