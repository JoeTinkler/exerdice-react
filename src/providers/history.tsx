import { PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { createContext } from 'react';
import { Activity } from "@db/schema";
import { addDaysUnix, sameDay } from "@helpers/date";
import { useActivities } from "@hooks/useActivities";
import { RollHistoryItem, useRolls } from "@hooks/useRolls";
import { HistoryStats, useHistoryStats } from "@hooks/useHistoryStats";
import { DayRollState } from "@hooks/useTodaysRoll";
import { HistoryChartData, useHistoryChartData } from "@hooks/useHistoryChartData";
import { DailyAverageStats, useDailyAverages } from "@hooks/useDailyAverages";
import { ProfileContext } from "./profile";
import { useLocalState } from "@hooks/useLocalState";

const defaultFilters = () => ({
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
});

const timespanFilters = (filters: HistoryFilters, offset?: number) => {
  const start = (filters.day ? new Date(filters.year, filters.month, filters.day).getTime() : new Date(filters.year, filters.month, 1).getTime()) + (offset ?? 0);
  const end = (filters.day ? addDaysUnix(start, 1) : new Date(filters.year, filters.month+1, 0).getTime()) + (offset ?? 0);
  return { start, end };
}

const defaultOptions = (): ChartOptions => ({
  type: 'line',
  columns: {
    minutes: true,
    rolls: true,
    distance: false,
    calories: false
  }
})

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
  chartOptions: ChartOptions;
  setChartOptions: (options: ChartOptions) => void;
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
  },
  chartOptions: defaultOptions(),
  setChartOptions: () => { }
});

type HistoryFilters = {
  year: number;
  month: number;
  day?: number;
}

export type ChartOptions = {
  type: 'line' | 'bar';
  columns: {
    minutes: boolean;
    rolls: boolean;
    distance: boolean;
    calories: boolean;
  }
}

export const HistoryDataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { profile } = useContext(ProfileContext);
  const [filters, setFilters] = useState<HistoryFilters>(defaultFilters());
  const { start, end } = timespanFilters(filters, profile.startOfDayOffset);
  const { activities, setFilters: setActivityFilters } = useActivities(start, end);
  const { rolls, setFilters: setRollFilters } = useRolls(start, end);
  const { stats } = useHistoryStats();
  const { data: chartData } = useHistoryChartData();
  const { value: chartOptions, setValue: setChartOptions } = useLocalState<ChartOptions>('exerdice-chart-options', defaultOptions());
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
  ), [activities, rolls]);

  useEffect(() => {
    const { start, end } = timespanFilters(filters, profile.startOfDayOffset);
    setActivityFilters({ start, end });
    setRollFilters({ start, end });
  }, [filters]);

  return (
    <HistoryDataContext.Provider value={{ filters, setFilters, stats, rolls, activityDays, activities, chartData, averageStats, chartOptions, setChartOptions }}>
      {children}
    </HistoryDataContext.Provider>
  );
}