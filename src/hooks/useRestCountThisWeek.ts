import { rests } from "@db/schema";
import { between, count } from "drizzle-orm";
import { addDaysUnix, startOfDayUnix } from "@helpers/date";
import { useSQLocalQuery } from "./useSQLocalQuery";
import { db } from "@db/db";


export const useRestCountThisWeek = () => {
  const dayOfWeek = new Date().getDay();
  const start = addDaysUnix(startOfDayUnix(), -dayOfWeek);
  const end = addDaysUnix(startOfDayUnix(), 7 - dayOfWeek);
  const query = db.select({ count: count(rests.id) }).from(rests).where(between(rests.timestamp, start, end))
  const { data, loading, error, refresh } = useSQLocalQuery<{ count: number }>(query);
  return { weekRestCount: data[0]?.count ?? 0, loading, error, refresh }
}