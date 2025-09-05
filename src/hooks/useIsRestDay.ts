import { Rest, rests } from "@db/schema";
import { DatabindConfig, useSQLocalTable } from "./useSQLocalTable";
import { desc, between } from "drizzle-orm";
import { startOfDayUnix, addDaysUnix } from "@helpers/date";
import { useContext } from "react";
import { ProfileContext } from "@providers/profile";

type IsRestDayFilters = {
  today: number;
}

const databindOptions = (offset: number): DatabindConfig<Rest, IsRestDayFilters> => ({
  orderBy: desc(rests.id),
  filters: {
    defaults: {
      today: startOfDayUnix(offset)
    },
    where: ({ today }) => between(rests.timestamp, today, addDaysUnix(today, 1))
  }
})

export const useIsRestDay = () => {
  const { profile } = useContext(ProfileContext);
  const { data, loading, error, refresh, insert, remove } = useSQLocalTable(rests, databindOptions(profile.startOfDayOffset));

  const onRemove = async () => {
    if (data[0]) {
      await remove(data[0].id);
    }
  }

  return { isRestDay: data.length > 0, loading, error, refresh, insert, removeRest: onRemove }
}