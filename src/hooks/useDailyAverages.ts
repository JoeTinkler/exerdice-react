import { addDaysUnix, unixTimestamp } from "@helpers/date";
import { useSQLocalQueryText } from "./useSQLocalQueryText";
import { DiceRollType } from "@db/schema";

export type DailyAverageStats = {
  averageMinutes: number;
  averageRoll: number;
  averageOvertime: number;
}

export const useDailyAverages = () => {
  const end = unixTimestamp();
  const start = addDaysUnix(end, -29);
  const { data, loading, error, refresh } = useSQLocalQueryText<Omit<DailyAverageStats, 'isRecord'>>(`
    WITH daily_activity AS (
      SELECT  DATE(ROUND(timestamp / 1000), 'unixepoch', 'localTime') as day,
              SUM(quantity) as minutes
      FROM activities
      WHERE timestamp BETWEEN ${start} AND ${end}
      GROUP BY day
    ),
    daily_roll AS (
      SELECT  DATE(ROUND(timestamp / 1000), 'unixepoch', 'localTime') as day,
              SUM(value) as roll
      FROM rolls
          INNER JOIN dice_rolls on roll_id = rolls.id AND type = ${DiceRollType.Activity}
      WHERE timestamp BETWEEN ${start} AND ${end}
      GROUP BY day
    )
    SELECT  AVG(minutes) as averageMinutes,
            AVG(roll) as averageRoll,
            AVG(MAX(IFNULL(minutes, 0) - IFNULL(roll, 0), 0)) as averageOvertime
    FROM daily_activity
      LEFT JOIN daily_roll ON daily_activity.day = daily_roll.day
  `);
  const stats: DailyAverageStats = data[0] ?? { averageMinutes: 0, averageRoll: 0, averageOvertime: 0 };
  return { stats, loading, error, refresh }
}