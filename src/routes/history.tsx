import { GlobalStyle, LoadMore } from "@components/Global";
import { NavBar } from "@components/NavBar";
import React, { useEffect, useState } from "react";
import { HistoryChart } from "@components/HistoryChart";
import { RouteWrapper } from "@components/ui/common/Route";
import { Row } from "@components/ui/common/Layout";
import { Header } from "@components/ui/common/Header";
import { Card } from "@components/ui/Card";
import { SubHeader } from "@components/ui/common/Header";
import { ActivitySeparator, SummaryHeader, SummaryMetrics, ToggleButton, ToggleButtons } from "@components/ui/routes/History";
import { Calendar } from "@components/Calendar";
import { addDaysUnix, sameDay, startOfDay } from "@helpers/date";
import { completedPercent, rollTotal } from "@helpers/rolls";
import { useActivities } from "@hooks/useActivities";
import { RollHistoryItem, useRolls } from "@hooks/useRolls";
import { Activity } from "@db/schema";
import { ActivityCard } from "@components/activity/ActivityCard";
import { useHistoryStats } from "@hooks/useHistoryStats";
import { DaySummary } from "@components/DaySummary";

type Filters = {
  year: number;
  month: number;
  day?: number;
}

const defaultFilters = () => ({
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
});

const timespanFilters = (filters: Filters) => {
  const start = filters.day ? new Date(filters.year, filters.month, filters.day).getTime() : new Date(filters.year, filters.month, 0).getTime();
  const end = filters.day ? addDaysUnix(start, 1) : new Date(filters.year, filters.month+1, 0).getTime();
  return { start, end };
}

export const HistoryRoute: React.FC = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters());
  const { start, end } = timespanFilters(filters);
  const { activities, setFilters: setActivityFilters } = useActivities(start, end);
  const { rolls, setFilters: setRollFilters } = useRolls(start, end);
  const { stats, setFilters: setStatsFitlers } = useHistoryStats(start, end);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [showList, setShowList] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);

  const activityDays = activities?.reduce((days, a) => {
    const date = new Date(a.timestamp);
    const dateString = date.toLocaleDateString();
    const day = days.find((d) => d.date === dateString);
    if (!day) {
      const roll = rolls.find((r) => sameDay(date, new Date(r.timestamp)));
      return [...days, { date: dateString, roll, activities: [a] }]
    }

    return days.map((d) => d.date === day.date ? { ...day, activities: [...day.activities, a] } : d);
  }, [] as { date: string, roll?: RollHistoryItem, activities: Activity[]}[]);

  useEffect(() => {
    if (!showCalendar) {
      setFilters(defaultFilters())
    } else {
      setFilters({ ...defaultFilters(), day: new Date().getDate() })
    }
  }, [showCalendar]);

  useEffect(() => {
    const { start, end } = timespanFilters(filters);
    setActivityFilters({ start, end });
    setRollFilters({ start, end });
    setStatsFitlers({ year: filters.year, month: filters.month });
  }, [filters]);

  return (
    <>
      <GlobalStyle />
      <RouteWrapper>
        <Row>
          <Header>Exercise History</Header>
        </Row>
        <Card>
          <SummaryHeader>
            <div>Last 30 days Summary</div>
            <div>{startOfDay().toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</div>
          </SummaryHeader>
          <SummaryMetrics>
            <div>
              <span>{stats.minutes}</span>
              Total Minutes
            </div>
            <div>
              <span>{stats.dailyAverage}</span>
              Daily Average
            </div>
            <div>
              <span>{stats.activities}</span>
              Activities
            </div>
          </SummaryMetrics>
          <HistoryChart />
        </Card>
        <Row>
          <SubHeader>Activity Log</SubHeader>
          <ToggleButtons>
            <ToggleButton $active={showList} onClick={() => setShowList(!showList)}>List</ToggleButton>
            <ToggleButton $active={showCalendar} onClick={() => setShowCalendar(!showCalendar)}>Calendar</ToggleButton>
          </ToggleButtons>
        </Row>
        {showCalendar && <Calendar day={filters.day!} month={filters.month} year={filters.year} onSelect={(day, month, year) => { setFilters({ ...filters, day, month, year })}} />}
        {showList && activityDays.map((day, i) => (
          <React.Fragment key={day.date}>
            <DaySummary date={day.date} roll={day.roll} activities={day.activities} />
            {day.activities.map((a) => (<ActivityCard key={a.id} activity={a as Activity} />))}
            {i !== activityDays.length -1 && <ActivitySeparator />}
          </React.Fragment>
        ))}
        {showLoadMore && <LoadMore>Load More</LoadMore>}
      </RouteWrapper>
      <NavBar />
    </>
  );
}
