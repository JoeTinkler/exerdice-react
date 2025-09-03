import { activities, Activity } from "@db/schema";
import { DatabindConfig, useSQLocalTable } from "./useSQLocalTable";
import { desc } from "drizzle-orm";
import { db } from "@db/db";
import { useSQLocalQuery } from "./useSQLocalQuery";
import { whereStartEnd } from "@helpers/sqlite";

type ActivityFilters = {
  start?: number;
  end?: number;
}

const databindOptions = (defaultStart?: number, defaultEnd?: number, limit?: number): DatabindConfig<Activity, ActivityFilters> => ({
  orderBy: desc(activities.timestamp),
  limit,
  filters: {
    defaults: {
      start: defaultStart,
      end: defaultEnd
    },
    where: ({ start, end }) => whereStartEnd(activities.timestamp, start, end)
  }
})

export const useActivities = (start?: number, end?: number) => {
  const { data, loading, error, refresh, insert, update, remove, setFilters } = useSQLocalTable(activities, databindOptions(start, end));
  return { activities: data, loading, error, refresh, insert, update, remove, setFilters }
}

export const useRecentActivities = () => {
  const query = db.select().from(activities).orderBy(desc(activities.timestamp)).limit(3);
  const { data, loading, error, refresh } = useSQLocalQuery<Activity>(query.getSQL());
  return { recentActivities: data, loading, error, refresh }
}