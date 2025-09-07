import { db } from "@db/db";
import { activities, activity_types, ActivityType, dice_rolls, DiceRollType, InsertDiceRoll, InsertRoll, rests, rolls } from "@db/schema";
import { inferSchema, initParser } from 'udsv';

type CsvExercise = {
  minutes: number;
  type: string;
  notes?: string;
}

const indexes = {
  date: 0,
  d4: 1,
  d20_1: 2,
  exercise_1: 3,
  d20_2: 4,
  exercise_2: 5,
  d20_3: 6,
  exercise_3: 7,
  d20_4: 8,
  exercise_4: 9,
  extra: 11,
  notes: 15
}

const middayOffset = 12 * 60 * 60 * 1000;

const processRow = async (row: any[], activityTypes: ActivityType[], offset?: number): Promise<ActivityType[]> => {
  const timestamp = new Date(`${row[indexes.date]}-${new Date().getFullYear()}`).getTime();
  if (!row[0] || isNaN(timestamp)) {
    return activityTypes;
  }

  const roll = buildRoll(timestamp + (offset ??0));
  const diceRolls = [
    buildDiceRoll(DiceRollType.Modifier, row[indexes.d4]),
    buildDiceRoll(DiceRollType.Activity, row[indexes.d20_1]),
    buildDiceRoll(DiceRollType.Activity, row[indexes.d20_2]),
    buildDiceRoll(DiceRollType.Activity, row[indexes.d20_3]),
    buildDiceRoll(DiceRollType.Activity, row[indexes.d20_4]),
  ].filter((r) => !!r);

  if (diceRolls.length > 0) {
    const result = await db.insert(rolls).values(roll).returning({ id: rolls.id });
    const rollId = result[0].id;
    for (let i = 0; i < diceRolls.length; i++) {
      await db.insert(dice_rolls).values({ ...diceRolls[i], rollId });
    }
  }

  if (row[indexes.exercise_1] === 'Rest Day') {
    await db.insert(rests).values({ timestamp: timestamp + (offset ?? 0) });
    return activityTypes;
  }

  const exercises = [
    { d20: indexes.d20_1, exercise: indexes.exercise_1 },
    { d20: indexes.d20_2, exercise: indexes.exercise_2 },
    { d20: indexes.d20_3, exercise: indexes.exercise_3 },
    { d20: indexes.d20_4, exercise: indexes.exercise_4 }
  ].reduce((arr, { d20, exercise}) => {
    const minutes = row[d20];
    const type = row[exercise]
    if (!minutes || !type || type === 'Fail') {
      return arr;
    }
    if (arr.some((e) => e.type === type)) {
      return arr.map((e) => e.type === type ? { ...e, minutes: e.minutes + minutes } : e);
    }
    return [...arr, { minutes, type }];
  }, [] as CsvExercise[]);

  const extra: number | null | undefined = row[indexes.extra];
  if (extra && exercises.length > 0) {
    exercises[exercises.length-1].minutes += extra;
  }

  let savedTypes = activityTypes;
  for (let i = 0; i < exercises.length; i++) {
    const { minutes, type } = exercises[i];
    let typeId = savedTypes.find((t) => t.name === type)?.id;
    if (!typeId) {
      const typeResult = await db.insert(activity_types).values({ name: type }).returning({ id: activity_types.id });
      typeId = typeResult[0].id;
      savedTypes = [...savedTypes, { id: typeId, name: type, icon: null } as ActivityType]
    }
    await db.insert(activities).values({ timestamp: timestamp + middayOffset, type: typeId, minutes, intensity: 3, notes: row[indexes.notes] })
  }

  return savedTypes;
}

const buildRoll = (timestamp: number): InsertRoll => ({ timestamp });

const buildDiceRoll = (type: DiceRollType, value?: number | null): Omit<InsertDiceRoll, 'rollId'> | undefined => {
  return value ? { type, value, max: type === DiceRollType.Modifier ? 4 : 20 } : undefined;
}

export const processCSVFile = (file?: File, offset?: number) => {
  if (!file) {
    return;
  }
  const reader = new FileReader()
  reader.onload = async (e) => {
    if (!e.target?.result || typeof e.target?.result !== 'string') {
      return;
    }
    let schema = inferSchema(e.target?.result);
    let parser = initParser(schema)
    const rows = parser.typedArrs(e.target?.result);
    let activityTypes: ActivityType[] = await db.select().from(activity_types);
    for (let i = 0; i < rows.length; i++) {
      activityTypes = await processRow(rows[i], activityTypes, offset);
    }
  };
  reader.readAsText(file)
}