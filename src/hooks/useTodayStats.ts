import { activities } from "@db/schema";
import { addDaysUnix, startOfDayUnix } from "@helpers/date";
import { between, count, sum } from "drizzle-orm";
import { useContext, useState } from "react";
import { db } from "@db/db";
import { useSQLocalQuery } from "./useSQLocalQuery";
import { ProfileContext } from "@providers/profile";

export type TodaysStats = {
  minutes: number;
  activities: number;
}

export const useTodaysStats = () => {
  const { profile } = useContext(ProfileContext);
  const [today, setToday] = useState(startOfDayUnix(profile.startOfDayOffset));

  const query = db.select({
    minutes: sum(activities.minutes),
    activities: count(activities.id),
  })
  .from(activities)
  .where(between(activities.timestamp, today, addDaysUnix(today, 1)));

  const { data: stats, loading, error, refresh } = useSQLocalQuery<TodaysStats>(query);

  return { stats: stats[0] ?? { minutes: 0, activities: 0}, loading, error, refresh, today, setToday }
}