import { DayRollState } from "@hooks/useTodaysRoll";
import { unixTimestamp } from "./date";
import { Activity } from "@db/schema";

export const completedPercent = (roll: DayRollState, activities: Activity[]) => {
  return (exerciseTotal(activities) / rollTotal(roll)) * 100;
}

export const rollTotal = (roll: DayRollState) => roll.activityRolls?.reduce((total, r) => total + r.value, 0) ?? 0;

export const exerciseTotal = (activities: Activity[]) => activities?.reduce((total, e) => total + e.minutes, 0) ?? 0;

const DEFAULT_MAX_COUNT = 4; // Default maximum number of rolls
const DEFAULT_MAX_EXERCISE_VALUE = 20; // Default maximum value for exercise rolls

export const generateRoll = (options?: RollOptions): DayRollState => {
  const max = options?.maxCount || DEFAULT_MAX_COUNT;
  const count = Math.floor(Math.random() * max) + 1;

  const roll: DayRollState = {
    modifierRoll: { value: count, max },
    activityRolls: Array.from(Array(count), () => ({
      value: Math.floor(Math.random() * (options?.maxExcerciseValue || DEFAULT_MAX_EXERCISE_VALUE)) + 1,
      max: options?.maxExcerciseValue || DEFAULT_MAX_EXERCISE_VALUE
    })),
    timestamp: unixTimestamp(),
  };

  console.log('Generated roll:', roll);
  return roll;
}