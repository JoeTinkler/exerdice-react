import { rests } from "@db/schema";
import { between, count } from "drizzle-orm";
import { addDaysUnix, startOfDayUnix } from "@helpers/date";
import { useSQLocalQuery } from "./useSQLocalQuery";
import { db } from "@db/db";

export type StreakStats = {
  current: number;
  highest: number;
  isRecord: boolean;
}

export const useStreakStats = () => {
  const dayOfWeek = new Date().getDay();
  const start = addDaysUnix(startOfDayUnix(), -dayOfWeek);
  const end = addDaysUnix(startOfDayUnix(), 7 - dayOfWeek);
  const query = db.select({ count: count(rests.id) }).from(rests).where(between(rests.timestamp, start, end))
  const { data: a, loading, error, refresh } = useSQLocalQuery<Omit<StreakStats, 'isRecord'>>(query);
  const data = [{
    current: 0,
    highest: 0
  }];
  const stats = data[0];
  return { streakStats: { ...stats, isRecord: stats.current >= stats.highest}, loading, error, refresh }
}