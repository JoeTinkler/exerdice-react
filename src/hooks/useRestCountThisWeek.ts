import { rests } from "@db/schema";
import { between, count } from "drizzle-orm";
import { addDaysUnix, startOfDayUnix } from "@helpers/date";
import { useSQLocalQuery } from "./useSQLocalQuery";
import { db } from "@db/db";
import { useContext } from "react";
import { ProfileContext } from "@providers/profile";


export const useRestCountThisWeek = () => {
  const { profile } = useContext(ProfileContext);
  const dayOfWeek = new Date().getDay();
  const start = addDaysUnix(startOfDayUnix(profile.startOfDayOffset), -dayOfWeek);
  const end = addDaysUnix(startOfDayUnix(profile.startOfDayOffset), 7 - dayOfWeek);
  const query = db.select({ count: count(rests.id) }).from(rests).where(between(rests.timestamp, start, end))
  const { data, loading, error, refresh } = useSQLocalQuery<{ count: number }>(query);
  return { weekRestCount: data[0]?.count ?? 0, loading, error, refresh }
}