import { rolls, dice_rolls, DiceRollType } from "@db/schema";
import { addDaysUnix, startOfDayUnix } from "@helpers/date";
import { between, eq } from "drizzle-orm";
import { useCallback, useContext, useEffect, useState } from "react";
import { SQLocalContext } from "@providers/sqLocal";
import { db } from "@db/db";
import { ProfileContext } from "@providers/profile";

export type DayRollState = {
  modifierRoll: DiceRollValue;
  activityRolls: DiceRollValue[];
  timestamp: number;
}

type DiceRollValue = {
  value: number;
  max: number;
}

export const useTodaysRolls = () => {
  const { profile } = useContext(ProfileContext);
  const { initialized } = useContext(SQLocalContext);
  const [roll, setRoll] = useState<DayRollState>();
  const [rollId, setRollId] = useState<number>();

  const [today, setToday] = useState(startOfDayUnix(profile.startOfDayOffset));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const goal = roll?.activityRolls?.reduce((sum, roll) => sum + roll.value, 0) ?? 0;

  const refresh = useCallback(async () => {
    try {
      setError(undefined);
      setLoading(true);
      const result = await db.select()
        .from(rolls)
        .leftJoin(dice_rolls, eq(dice_rolls.rollId, rolls.id))
        .where(between(rolls.timestamp, today, addDaysUnix(today, 1)));

      const rollBase = result[0]?.rolls;
      const modifierRoll = result.filter((r) => r.dice_rolls?.type === DiceRollType.Modifier).map((r) => r.dice_rolls)[0];
      const activityRolls = result.filter((r) => r.dice_rolls?.type === DiceRollType.Activity).map((r) => r.dice_rolls);

      setRollId(rollBase?.id);
      setRoll(rollBase ? {
        timestamp: rollBase.timestamp,
        modifierRoll: {
          value: modifierRoll?.value ?? 0,
          max: modifierRoll?.max ?? 0
        },
        activityRolls: activityRolls.map((r) => ({
          value: r?.value ?? 0,
          max: r?.max ?? 0
        }))

      } : undefined);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setRoll(undefined);
    } finally {
      setLoading(false);
    }
  }, [today]);

  const saveRoll = useCallback(async ({ modifierRoll, activityRolls }: Omit<DayRollState, 'timestamp'>) => {
    let id = rollId;
    if (id) {
      await db.delete(dice_rolls).where(eq(dice_rolls.rollId, id));
    } else {
      const result = await db.insert(rolls).values({ timestamp: today }).returning({ id: rolls.id });
      if (!result[0]?.id) {
        throw new Error('Could not insert new roll');
      }
      id = result[0].id;
    }

    await db.insert(dice_rolls).values({ rollId: id, type: DiceRollType.Modifier, ...modifierRoll });
    for (let i = 0; i < activityRolls.length; i++) {
      await db.insert(dice_rolls).values({ rollId: id, type: DiceRollType.Activity, ...activityRolls[i] });
    }
    setRoll({ timestamp: roll?.timestamp ?? today, modifierRoll, activityRolls });
    setRollId(id);
  }, [today, rollId, roll]);

  useEffect(() => {
    if (initialized && !loading) {
      refresh();
    }
  }, [initialized, today]);

  return { todaysRoll: roll, goal, loading, error, refresh, saveRoll, today, setToday }
}