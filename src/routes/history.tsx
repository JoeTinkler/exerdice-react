import React, { useContext, useEffect, useState } from "react";
import { HistoryChart } from "@components/history/HistoryChart";
import { Row } from "@components/ui/common/Layout";
import { Header } from "@components/ui/common/Header";
import { Card } from "@components/ui/Card";
import { SubHeader } from "@components/ui/common/Header";
import { ActivitySeparator, StatsToggle, ToggleButton, ToggleButtons } from "@components/ui/routes/History";
import { Calendar } from "@components/Calendar";
import { Activity } from "@db/schema";
import { ActivityCard } from "@components/activity/ActivityCard";
import { DaySummary } from "@components/DaySummary";
import { HistoryDataContext } from "@providers/history";
import { SummaryMetrics } from "@components/history/SummaryMetrics";
import { SummaryHeader } from "@components/history/SummaryHeader";
import { AdvancedMetrics } from "@components/history/AdvancedMetrics";
import { ConfigureChart } from "@components/history/ChartOptions";

const defaultFilters = () => ({
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
});

export const HistoryRoute: React.FC = () => {
  const { filters, setFilters, activityDays } = useContext(HistoryDataContext);
  const [showList, setShowList] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAdvancedStats, setShowAdvancedStats] = useState(false);

  useEffect(() => {
    if (!showCalendar) {
      setFilters(defaultFilters())
    } else {
      setFilters({ ...defaultFilters(), day: new Date().getDate() })
    }
  }, [showCalendar]);

  return (
    <>
      <Row>
        <Header>Activity History</Header>
      </Row>
      <Card>
        <SummaryHeader />
        <SummaryMetrics />
        <HistoryChart />
        <StatsToggle onClick={() => setShowAdvancedStats(!showAdvancedStats)}>Show {showAdvancedStats ? 'Less' : 'More'}</StatsToggle>
        { showAdvancedStats && <AdvancedMetrics />}
        { showAdvancedStats && <ConfigureChart />}
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
    </>
  );
}
