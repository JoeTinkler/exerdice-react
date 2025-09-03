import { useSQLocalQuery } from "./useSQLocalQuery";
import { db } from "@db/db";
import { activities, dice_rolls, DiceRollType, rolls } from "@db/schema";
import { timestampDate, whereStartEnd } from "@helpers/sqlite";
import { and, countDistinct, eq, sum } from "drizzle-orm";
import { addDaysUnix, daysBetween, startOfDayUnix, toDbFormatUnix, unixTimestamp } from "@helpers/date";

type ActivityRow = {
  date: string;
  totalMinutes: number;
  totalActivities: number
}

type RollRow = {
  date: string;
  totalRoll: number;
}

type HistoryStats = ActivityRow & RollRow;

export const useHistoryChartData = () => {
  const end = unixTimestamp();
  const start = addDaysUnix(end, -29);

  const activitiesQuery = db.select({
    date: timestampDate(activities.timestamp),
    totalMinutes: sum(activities.minutes),
    totalActivities: countDistinct(activities.id),
  })
  .from(activities)
  .groupBy(timestampDate(activities.timestamp))
  .where(whereStartEnd(activities.timestamp, start, end));
  const { data: activitiesData, loading: activitiesLoading, error: activitiesError, refresh: activitiesRefresh } = useSQLocalQuery<ActivityRow>(activitiesQuery);

  const rollsQuery = db.select({
    date: timestampDate(rolls.timestamp),
    totalRoll: sum(dice_rolls.value),
  })
  .from(rolls)
  .innerJoin(dice_rolls, and(eq(dice_rolls.rollId, rolls.id), eq(dice_rolls.type, DiceRollType.Activity)))
  .groupBy(timestampDate(rolls.timestamp))
  .where(whereStartEnd(rolls.timestamp, start, end));
  const { data: rollsData, loading: rollsLoading, error: rollsError, refresh: rollsRefresh } = useSQLocalQuery<RollRow>(rollsQuery);

  const refresh = async () => {
    await activitiesRefresh();
    await rollsRefresh();
  }

  console.log({ start, end, daysBetween: daysBetween(start, end) })

  const days = Array.from(Array(daysBetween(start, end)+1)).map((_, i) => {
    const date = toDbFormatUnix(addDaysUnix(start, i));
    const ad = activitiesData.find((d) => d.date === date);
    const rd = rollsData.find((d) => d.date === date);
    return { date, ...ad, ...rd }
  }, [] as HistoryStats[]);

  console.log(days);
  return { data: days, loading: activitiesLoading || rollsLoading, error: activitiesError ?? rollsError, refresh }
}