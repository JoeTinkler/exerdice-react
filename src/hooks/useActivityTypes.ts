import { activity_types, ActivityType } from "@db/schema";
import { DatabindConfig, useSQLocalTable } from "./useSQLocalTable";
import { desc } from "drizzle-orm";

const databindOptions: DatabindConfig<ActivityType> = {
  orderBy: desc(activity_types.id)
}

export const useActivityTypes = () => {
  const { data, loading, error, refresh, insert, update, remove } = useSQLocalTable(activity_types, databindOptions);
  return { activityTypes: data, loading, error, refresh, insert, update, remove }
}