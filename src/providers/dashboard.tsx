import { InsertRest } from "@db/schema";
import { useIsRestDay } from "@hooks/useIsRestDay";
import { useRestCountThisWeek } from "@hooks/useRestCountThisWeek";
import { StreakStats, useStreakStats } from "@hooks/useStreakStats";
import { DayRollState, useTodaysRolls } from "@hooks/useTodaysRoll";
import { TodaysStats, useTodaysStats } from "@hooks/useTodayStats";
import { PropsWithChildren } from "react";
import { createContext } from 'react';

type DashboardContextData = {
  weekRestCount: number;
  isRestDay: boolean;
  addRest: (rest: InsertRest) => void;
  todaysRoll?: DayRollState;
  goal: number;
  stats: TodaysStats;
  streakStats: StreakStats;
  hasRolled: boolean;
  completionPercentage: number;
  onCancelRest: () => Promise<void>
}

export const DashboardContext = createContext<DashboardContextData>({
  weekRestCount: 0,
  isRestDay: false,
  addRest: () => {},
  goal: 0,
  stats: { minutes: 0, activities: 0 },
  streakStats: { current: 0, highest: 0, isRecord: false },
  hasRolled: false,
  completionPercentage: 0,
  onCancelRest: async () => { }
});

export const DashboardProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { isRestDay, insert: addRest, removeRest } = useIsRestDay();
  const { weekRestCount, refresh: refreshRestCount } = useRestCountThisWeek();
  const { todaysRoll, goal } = useTodaysRolls();
  const { stats } = useTodaysStats();
  const { stats: streakStats } = useStreakStats();
  const hasRolled = goal > 0;
  const completionPercentage =  hasRolled ? (stats.minutes / goal) * 100 : 0;

  const onAddRest = async (rest: InsertRest) => {
    await addRest(rest);
    refreshRestCount();
  }

  const onCancelRest = async () => {
    await removeRest();
    refreshRestCount();
  }

  return (
    <DashboardContext.Provider value={{ weekRestCount, isRestDay, addRest: onAddRest, todaysRoll, goal, stats, streakStats, hasRolled, completionPercentage, onCancelRest }}>
      {children}
    </DashboardContext.Provider>
  );
}