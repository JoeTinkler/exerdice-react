import { InsertActivityType } from "./schema";

export const CREATE_TABLES_QUERY = `
  CREATE TABLE IF NOT EXISTS migrations (
    id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    version integer NOT NULL,
    timestamp integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS activities (
    id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    activity_type_id integer,
    timestamp integer NOT NULL,
    quantity integer NOT NULL,
    calories integer,
    distance integer,
    intensity integer NOT NULL,
    notes text,
    FOREIGN KEY (activity_type_id) REFERENCES activity_types(id) ON UPDATE no action ON DELETE no action
  );

  CREATE TABLE IF NOT EXISTS activity_types (
    id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    name text NOT NULL,
    icon text
  );

  CREATE TABLE IF NOT EXISTS dice_rolls (
    id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    roll_id integer NOT NULL,
    type integer NOT NULL,
    value integer NOT NULL,
    max integer NOT NULL,
    FOREIGN KEY (roll_id) REFERENCES rolls(id) ON UPDATE no action ON DELETE no action
  );

  CREATE TABLE IF NOT EXISTS rolls (
    id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    timestamp integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS rests (
    id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    timestamp integer NOT NULL
  );
`;

const DEFAULT_ACTIVITY_TYPES: InsertActivityType[] = [
  { id: 1, name: 'Running', icon: 'run' },
  { id: 2, name: 'Walking', icon: 'walk' },
  { id: 3, name: 'Swimming', icon: 'swim' },
  { id: 4, name: 'Cycling', icon: 'bicycle' },
  { id: 5, name: 'Yoga', icon: 'heart' },
  { id: 6, name: 'Strength Training', icon: 'run' },
  { id: 7, name: 'Pilates', icon: 'heart' }
];

export const MIGRATIONS = [
  {
    version: 1,
    sql:`
      INSERT OR REPLACE INTO activity_types (id, name, icon)
      VALUES
      ${DEFAULT_ACTIVITY_TYPES.map((t, i) => `(${i+1}, '${t.name}', '${t.icon}')\n`)}
    `
  }
];