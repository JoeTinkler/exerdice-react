import { activities, Activity, InsertActivity } from "@db/schema";
import { DatabindConfig, useSQLocalTable } from "./useSQLocalTable";
import { desc, eq } from "drizzle-orm";
import { useCallback } from "react";
import { unixTimestamp } from "@helpers/date";

type ActivityFilters = {
  id: number;
}

const databindOptions = (defaultId: number): DatabindConfig<Activity, ActivityFilters> => ({
  orderBy: desc(activities.id),
  filters: {
    defaults: {
      id: defaultId
    },
    where: ({ id }) => eq(activities.id, id)
  }
})

export const useActivity = (id?: number) => {
  const { data, loading, error, refresh, insert, update, remove } = useSQLocalTable(activities, id ? databindOptions(id) : undefined);
  const notFound = id && !loading && data[0]?.id !== id;

  const save = useCallback(async (activity: Partial<InsertActivity>, successCallback?: (id: number) => void) => {
    let saveId = id;
    if (saveId) {
      console.log('updating')
      await update(saveId, activity);
    } else {
      console.log('inserting')
      saveId = await insert({
        timestamp: unixTimestamp(),
        minutes: 0,
        intensity: 3,
        ...activity
      });
    }
    if (successCallback && saveId) {
      successCallback(saveId);
    }
  }, [id]);

  const removeActivity = useCallback(async () =>  {
    if (id) {
      await remove(id);
    }
  }, [id])

  return { activity: data[0], loading, error: notFound ? `Could not load activity (id:${id})` : error, refresh, save, remove: removeActivity }
}