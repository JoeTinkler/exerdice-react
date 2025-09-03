import { rests, Rest } from "@db/schema";
import { desc } from "drizzle-orm";
import { db } from "@db/db";
import { useSQLocalQuery } from "./useSQLocalQuery";
import { whereStartEnd } from "@helpers/sqlite";

export const useRests = (start?: number, end?: number) => {
  const query = db.select()
    .from(rests)
    .orderBy(desc(rests.timestamp))
    .where(whereStartEnd(rests.timestamp, start, end));

  const { data, loading, error, refresh } = useSQLocalQuery<Rest>(query);
  return { rests: data, loading, error, refresh }
}