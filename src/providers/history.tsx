import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { createContext } from 'react';
import { Activity } from "@db/schema";
import { addDaysUnix, sameDay } from "@helpers/date";
import { useActivities } from "@hooks/useActivities";
import { RollHistoryItem, useRolls } from "@hooks/useRolls";
import { HistoryStats, useHistoryStats } from "@hooks/useHistoryStats";
import { DayRollState } from "@hooks/useTodaysRoll";
import { HistoryChartData, useHistoryChartData } from "@hooks/useHistoryChartData";
import { DailyAverageStats, useDailyAverages } from "@hooks/useDailyAverages";

const defaultFilters = () => ({
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
});

const timespanFilters = (filters: HistoryFilters) => {
  const start = filters.day ? new Date(filters.year, filters.month, filters.day).getTime() : new Date(filters.year, filters.month, 0).getTime();
  const end = filters.day ? addDaysUnix(start, 1) : new Date(filters.year, filters.month+1, 0).getTime();
  return { start, end };
}

type ActivityDay = {
  date: string;
  roll?: RollHistoryItem;
  activities: Activity[];
}

type HistoryDataContextData = {
  filters: HistoryFilters;
  setFilters: (filters: HistoryFilters) => void;
  stats: HistoryStats;
  rolls: DayRollState[];
  activityDays: ActivityDay[];
  activities: Activity[];
  chartData: HistoryChartData[];
  averageStats: DailyAverageStats;
}

export const HistoryDataContext = createContext<HistoryDataContextData>({
  filters: defaultFilters(),
  setFilters: () => { },
  stats: {
    minutes: 0,
    dailyAverage: 0,
    activities: 0,
  },
  rolls: [],
  activityDays: [],
  activities: [],
  chartData: [],
  averageStats: {
    averageMinutes: 0,
    averageRoll: 0,
    averageOvertime: 0
  }
});

type HistoryFilters = {
  year: number;
  month: number;
  day?: number;
}

export const HistoryDataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [filters, setFilters] = useState<HistoryFilters>(defaultFilters());
  const { start, end } = timespanFilters(filters);
  const { activities, setFilters: setActivityFilters } = useActivities(start, end);
  const { rolls, setFilters: setRollFilters } = useRolls(start, end);
  const { stats } = useHistoryStats();
  const { data: chartData } = useHistoryChartData();
  const { stats: averageStats } = useDailyAverages();

  const activityDays = useMemo(() => activities?.reduce((days, a) => {
      const date = new Date(a.timestamp);
      const dateString = date.toLocaleDateString();
      const day = days.find((d) => d.date === dateString);
      if (!day) {
        const roll = rolls.find((r) => sameDay(date, new Date(r.timestamp)));
        return [...days, { date: dateString, roll, activities: [a] }]
      }

      return days.map((d) => d.date === day.date ? { ...day, activities: [...day.activities, a] } : d);
    }, [] as ActivityDay[]
  ), [activities]);

  useEffect(() => {
    const { start, end } = timespanFilters(filters);
    setActivityFilters({ start, end });
    setRollFilters({ start, end });
  }, [filters]);

  return (
    <HistoryDataContext.Provider value={{ filters, setFilters, stats, rolls, activityDays, activities, chartData, averageStats }}>
      {children}
    </HistoryDataContext.Provider>
  );
}