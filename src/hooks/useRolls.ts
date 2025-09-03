import { dice_rolls, DiceRollType, Roll, DiceRoll, rolls } from "@db/schema";
import { desc, eq } from "drizzle-orm";
import { db } from "@db/db";
import { useSQLocalQuery } from "./useSQLocalQuery";
import { DayRollState } from "./useTodaysRoll";
import { whereStartEnd } from "@helpers/sqlite";
import { useState } from "react";

type QueryResultItem = {
  rolls: Roll,
  dice_rolls?: DiceRoll
}

export type RollHistoryItem = DayRollState & {
  id: number;
}

const reduceModifierRow = (rolls: RollHistoryItem[], row: QueryResultItem): RollHistoryItem[] => {
  if (rolls.some((r) => r.id === row.rolls.id)) {
    return rolls.map((r) => r.id === row.rolls.id ? { ...r, modifierRoll: row.dice_rolls! } : r);
  }
  return [...rolls, { ...row.rolls, modifierRoll: row.dice_rolls!, activityRolls: [] }]
}

const reduceActivityRow = (rolls: RollHistoryItem[], row: QueryResultItem): RollHistoryItem[] => {
  if (rolls.some((r) => r.id === row.rolls.id)) {
    return rolls.map((r) => r.id === row.rolls.id ? { ...r, activityRolls: [...r.activityRolls, row.dice_rolls!] } : r);
  }
  return [...rolls, { ...row.rolls, modifierRoll: { value: 0, max: 0}, activityRolls: [row.dice_rolls!] }]
}

const reduceRollRow = (rolls: RollHistoryItem[], row: QueryResultItem): RollHistoryItem[] => {
  if (rolls.some((r) => r.id === row.rolls.id)) {
    return rolls.map((r) => r.id === row.rolls.id ? { ...r, timestamp: row.rolls.timestamp } : r);
  }
  return [...rolls, { ...row.rolls, modifierRoll: { value: 0, max: 0}, activityRolls: [] }]
}

const reduceQueryRow = (rolls: RollHistoryItem[], row: QueryResultItem) => {
  switch (row.dice_rolls?.type) {
    case DiceRollType.Modifier: return reduceModifierRow(rolls, row);
    case DiceRollType.Activity: return reduceActivityRow(rolls, row);
    default: return reduceRollRow(rolls, row);
  }
}

export const useRolls = (start?: number, end?: number) => {
  const [filters, setFilters] = useState({ start, end });
  const query = db.select()
    .from(rolls)
    .leftJoin(dice_rolls, eq(dice_rolls.rollId, rolls.id))
    .orderBy(desc(rolls.timestamp))
    .where(whereStartEnd(rolls.timestamp, filters.start, filters.end));

  const { data, loading, error, refresh } = useSQLocalQuery<QueryResultItem>(query);
  const rollsData = data.reduce(reduceQueryRow, [] as RollHistoryItem[]);
  return { rolls: rollsData, loading, error, refresh, setFilters }
}