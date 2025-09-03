import { PropsWithChildren } from "react";
import { createContext } from 'react';
import { ActivityType, InsertActivityType } from "@db/schema";
import { useActivityTypes } from "@hooks/useActivityTypes";

type ActivityTypesContextData = {
  activityTypes: ActivityType[];
  loading: boolean;
  error?: string;
  insert: (activityType: InsertActivityType, sortCompare?: (a: ActivityType, b: ActivityType) => number) => void;
  update: (id: number, activityType: Partial<InsertActivityType>) => void;
  remove: (id: number) => void;
}

export const ActivityTypesContext = createContext<ActivityTypesContextData>({
  activityTypes: [],
  loading: false,
  insert: () => { },
  update: () => { },
  remove: () => { }
});

export const ActivityTypesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { activityTypes, loading, error, insert, update, remove } = useActivityTypes();
  return (
    <ActivityTypesContext.Provider value={{ activityTypes, loading, error, insert, update, remove  }}>
      {children}
    </ActivityTypesContext.Provider>
  );
}