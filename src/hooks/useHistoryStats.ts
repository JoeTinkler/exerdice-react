import { useState } from "react";
import { useSQLocalQuery } from "./useSQLocalQuery";
import { db } from "@db/db";
import { activities } from "@db/schema";
import { timestampDate, whereStartEnd } from "@helpers/sqlite";
import { avg, countDistinct, sum } from "drizzle-orm";

export type HistoryStats = {
  minutes: number;
  dailyAverage: number;
  activities: number
}

export const useHistoryStats = (year: number, month: number) => {
  const [filters, setFilters] = useState({ year, month });
  const start = new Date(filters.year, filters.month, 1).getTime();
  const end = new Date(filters.year, filters.month+1, 1).getTime();
  const query = db.select({
    minutes: sum(activities.minutes),
    dailyAverage: avg(activities.minutes),
    activities: countDistinct(activities.id),
  })
  .from(activities)
  .groupBy(timestampDate(activities.timestamp))
  .where(whereStartEnd(activities.timestamp, start, end));

  const { data, loading, error, refresh } = useSQLocalQuery<HistoryStats>(query);
  return { stats: data[0] ?? { minutes: 0, dailyAverage: 0, activities: 0 }, loading, error, refresh, setFilters }
}