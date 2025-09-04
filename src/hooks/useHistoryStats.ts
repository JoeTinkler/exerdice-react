import { addDaysUnix, unixTimestamp } from "@helpers/date";
import { useSQLocalQueryText } from "./useSQLocalQueryText";

export type HistoryStats = {
  minutes: number;
  dailyAverage: number;
  activities: number
}

export const useHistoryStats = () => {
  const end = unixTimestamp();
  const start = addDaysUnix(end, -29);

  const { data, loading, error, refresh } = useSQLocalQueryText<HistoryStats>(`
    SELECT SUM(quantity) as minutes, AVG(quantity) as dailyAverage, COUNT(*) as activities
    FROM (
      SELECT SUM(quantity) as quantity
      FROM activities
      WHERE timestamp BETWEEN ${start} AND ${end}
      GROUP BY DATE(ROUND(timestamp / 1000), 'unixEpoch', 'localTIme')
    )
  `);
  return { stats: data[0] ?? { minutes: 0, dailyAverage: 0, activities: 0 }, loading, error, refresh }
}