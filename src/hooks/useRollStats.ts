import { addDaysUnix, startOfDayUnix, toDbFormatUnix } from "@helpers/date";
import { useContext, useState } from "react";
import { useSQLocalQuery } from "./useSQLocalQuery";
import { dice_rolls, DiceRollType, rolls } from "@db/schema";
import { db } from "@db/db";
import { and, between, eq, sum } from "drizzle-orm";
import { timestampDate } from "@helpers/sqlite";
import { ProfileContext } from "@providers/profile";

export type RollStats = {
  yesterdayTotal: number;
  weekAverage: number;
}

type DayRollRow = {
  day: string;
  total: number;
}

export const useRollStats = () => {
  const { profile } = useContext(ProfileContext);
  const [today, setToday] = useState(startOfDayUnix(profile.startOfDayOffset));
  const query = db.select({
    day: timestampDate(rolls.timestamp),
    total: sum(dice_rolls.value).mapWith(Number)
  })
  .from(rolls)
  .innerJoin(dice_rolls, and(eq(dice_rolls.rollId, rolls.id), eq(dice_rolls.type, DiceRollType.Activity)))
  .groupBy(timestampDate(rolls.timestamp))
  .where(between(rolls.timestamp, addDaysUnix(today, -7), today));

  const { data, loading, error, refresh } = useSQLocalQuery<DayRollRow>(query);
  const stats: RollStats = {
    yesterdayTotal: data.find((d) => d.day === toDbFormatUnix(addDaysUnix(today, -1)))?.total ?? 0,
    weekAverage: data.length > 0 ? data.reduce((total, b) => total + b.total, 0) / data.length : 0
  }
  return { stats, loading, error, refresh, today, setToday }
}