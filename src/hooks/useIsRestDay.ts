import { Rest, rests } from "@db/schema";
import { DatabindConfig, useSQLocalTable } from "./useSQLocalTable";
import { desc, between } from "drizzle-orm";
import { startOfDayUnix, addDaysUnix } from "@helpers/date";

type IsRestDayFilters = {
  today: number;
}


const databindOptions: DatabindConfig<Rest, IsRestDayFilters> = {
  orderBy: desc(rests.id),
  filters: {
    defaults: {
      today: startOfDayUnix()
    },
    where: ({ today }) => between(rests.timestamp, today, addDaysUnix(today, 1))
  }
}

export const useIsRestDay = () => {
  const { data, loading, error, refresh, insert } = useSQLocalTable(rests, databindOptions);
  return { isRestDay: data.length > 0, loading, error, refresh, insert }
}