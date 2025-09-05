import { DiceRollType } from "@db/schema";
import { useSQLocalQueryText } from "./useSQLocalQueryText";

export type StreakStats = {
  current: number;
  highest: number;
  isRecord: boolean;
}

export const useStreakStats = () => {
  const { data, loading, error, refresh } = useSQLocalQueryText<Omit<StreakStats, 'isRecord'>>(`
    WITH daily_activity AS (
      SELECT
        DATE(ROUND(timestamp / 1000), 'unixepoch', 'localTime') AS day,
        SUM(quantity) AS total_quantity
      FROM activities
      GROUP BY day
    ),
    daily_goal AS (
      SELECT
        DATE(ROUND(timestamp / 1000), 'unixepoch', 'localTime') AS day,
        SUM(d.value) AS goal
      FROM dice_rolls d
      JOIN rolls r ON d.roll_id = r.id
      WHERE d.type = ${DiceRollType.Activity}
      GROUP BY day
    ),
    rest_days AS (
      SELECT DISTINCT
          DATE(ROUND(timestamp / 1000), 'unixepoch', 'localTime') AS day
      FROM rests
    ),
    successful_days AS (
      SELECT g.day
      FROM daily_goal g
      LEFT JOIN daily_activity a ON a.day = g.day
      LEFT JOIN rest_days rd ON rd.day = g.day
      WHERE rd.day IS NOT NULL
        OR IFNULL(a.total_quantity, 0) >= g.goal
    ),
    numbered AS (
      SELECT
        day,
        ROW_NUMBER() OVER (ORDER BY day) AS rn,
        JULIANDAY(day) AS jd
      FROM successful_days
    ),
    grouped AS (
      SELECT
        day,
        rn - jd AS grp
      FROM numbered
    ),
    streaks AS (
      SELECT
        MIN(day) AS streak_start,
        MAX(day) AS streak_end,
        COUNT(*) AS streak_length
      FROM grouped
      GROUP BY grp
    ),
    longest_streak AS (
      SELECT MAX(streak_length) AS longest_streak
      FROM streaks
    ),
    current_streak AS (
      SELECT streak_length
      FROM streaks
      WHERE date(streak_end) = date('now', 'localtime')
        OR date(streak_end) = date('now', '-1 day', 'localtime')
      ORDER BY streak_end DESC
      LIMIT 1
    )
    SELECT
    IFNULL((SELECT streak_length FROM current_streak), 0) AS current,
    (SELECT longest_streak FROM longest_streak) AS highest;
  `);
  const stats = data[0] ?? { current: 0, highest: 0 };
  return { stats: { ...stats, isRecord: stats.current >= stats.highest }, loading, error, refresh }
}