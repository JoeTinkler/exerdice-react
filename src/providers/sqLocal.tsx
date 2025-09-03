import { PropsWithChildren, useEffect, useState } from "react";
import { createContext } from 'react';
import { db } from "@db/db";
import { migrations } from "@db/schema";
import { CREATE_TABLES_QUERY, MIGRATIONS } from "@db/seed";
import { unixTimestamp } from "@helpers/date";

type SQLocalContextData = {
  initialized: boolean;
  error?: any;
}

/*const migrateSpreadsheetData = async (localExercises: MiroExerciseState[], localRolls: MiroRollState[], localRests: number[]) => {
  const migrate = localStorage.getItem('exerdice-localstorage-migrated') !== 'true';
  if (!migrate) {
    return;
  }

  localStorage.setItem('exerdice-localstorage-migrated', 'true');
  for (let i = 0; i< localExercises.length; i++) {
    const exercise = localExercises[i];
    await db.insert(activities).values({
      timestamp: exercise.timestamp,
      type: typeof(exercise.type) === 'number' ? exercise.type : undefined,
      minutes: exercise.minutes,
      calories: exercise.calories,
      intensity: exercise.intensity,
      notes: exercise.notes
    });
  }

  for (let i = 0; i< localRolls.length; i++) {
    const { timestamp, modifierRoll, exerciseRolls} = localRolls[i];
    const result = await db.insert(rolls).values({ timestamp }).returning({ id: rolls.id});
    const rollId = result[0]?.id;
    if (rollId && modifierRoll && exerciseRolls) {
      await db.insert(dice_rolls).values({ rollId, type: DiceRollType.Modifier, value: modifierRoll.value, max: modifierRoll.max });

      for (let j = 0; j < exerciseRolls.length; j++) {
        const exRoll = exerciseRolls[j];
        await db.insert(dice_rolls).values({ rollId, type: DiceRollType.Activity, value: exRoll.value, max: exRoll.max });
      }
    }
  }

  for (let i = 0; i< localRests.length; i++) {
    const rest = localRests[i];
    await db.insert(rests).values({ timestamp: rest });
  }
}*/

export const SQLocalContext = createContext<SQLocalContextData>({
  initialized: false,
});

export const SQLocalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    seed();
  }, []);

  const seed = async () => {
    try {
      console.log('Creating Database Tables')
      await db.run(CREATE_TABLES_QUERY);
      const migrationHistory = await db.select().from(migrations);
      for (let i = 0; i < MIGRATIONS.length; i++) {
        const { version, sql } = MIGRATIONS[i];
        if (migrationHistory.some((m) => m.version === version)) {
          continue;
        }
        console.log(`Running migration version ${version}`)
        await db.run(sql);
        await db.insert(migrations).values({ version, timestamp: unixTimestamp() });
      }
      setInitialized(true);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  return (
    <SQLocalContext.Provider value={{ initialized, error }}>
      {children}
    </SQLocalContext.Provider>
  );
}