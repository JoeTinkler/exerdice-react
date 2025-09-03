import { sqliteTable, int, text } from 'drizzle-orm/sqlite-core';

export const migrations = sqliteTable('migrations', {
	id: int('id').primaryKey({ autoIncrement: true }),
  version: int('version').notNull(),
	timestamp: int('timestamp').notNull(),
});

export type Migration = typeof migrations.$inferSelect;
export type InsertMigration = typeof migrations.$inferInsert;

export type ActivityIcon = 'bicycle' | 'dumbbell' | 'heart' | 'run' | 'swim' | 'walk';

export const activity_types = sqliteTable('activity_types', {
	id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
	icon: text('icon').$type<ActivityIcon>()
});

export type ActivityType = typeof activity_types.$inferSelect;
export type InsertActivityType = typeof activity_types.$inferInsert;

export const activities = sqliteTable('activities', {
	id: int('id').primaryKey({ autoIncrement: true }),
	type: int('activity_type_id').references((() => activity_types.id)),
	timestamp: int('timestamp').notNull(),
  minutes: int('quantity').notNull(),
	calories: int('calories'),
	distance: int('distance'),
	intensity: int('intensity').notNull(),
	notes: text('notes'),
});

export type Activity = typeof activities.$inferSelect;
export type InsertActivity = typeof activities.$inferInsert;

export const rolls = sqliteTable('rolls', {
	id: int('id').primaryKey({ autoIncrement: true }),
	timestamp: int('timestamp').notNull(),
});

export type Roll = typeof rolls.$inferSelect;
export type InsertRoll = typeof rolls.$inferInsert;

export enum DiceRollType {
	Modifier = 1,
	Activity = 2
}

export const dice_rolls = sqliteTable('dice_rolls', {
	id: int('id').primaryKey({ autoIncrement: true }),
	rollId: int('roll_id').references(() => rolls.id).notNull(),
	type: int('type').notNull().$type<DiceRollType>(),
	value: int('value').notNull(),
	max: int('max').notNull(),
});

export type DiceRoll = typeof dice_rolls.$inferSelect;
export type InsertDiceRoll = typeof dice_rolls.$inferInsert;

export const rests = sqliteTable('rests', {
	id: int('id').primaryKey({ autoIncrement: true }),
	timestamp: int('timestamp').notNull(),
});

export type Rest = typeof rests.$inferSelect;
export type InsertRest = typeof rests.$inferInsert;