import { rests, Rest } from "@db/schema";
import { desc } from "drizzle-orm";
import { db } from "@db/db";
import { useSQLocalQuery } from "./useSQLocalQuery";
import { whereStartEnd } from "@helpers/sqlite";
import { useEffect, useState } from "react";

export const useRests = (start?: number, end?: number) => {
  const [filters, setFilters] = useState({ start, end });
  const query = db.select()
    .from(rests)
    .orderBy(desc(rests.timestamp))
    .where(whereStartEnd(rests.timestamp, filters.start, filters.end));

  const { data, loading, error, refresh } = useSQLocalQuery<Rest>(query);

  useEffect(() => {
    refresh();
  }, [filters]);

  return { rests: data, loading, error, refresh, setFilters }
}