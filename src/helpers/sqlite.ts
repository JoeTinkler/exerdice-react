import { between, gte, lt, sql, SQL } from "drizzle-orm";
import { SQLiteColumn } from "drizzle-orm/sqlite-core";

export const whereStartEnd = (column: SQLiteColumn, start?: number, end?: number): SQL<unknown> | undefined => {
  if (start && end) {
    return between(column, start, end);
  }
  if (start) {
    return gte(column, start);
  }
  if (end) {
    return lt(column, end);
  }
}

export const timestampDate = (column: SQLiteColumn) => sql`DATE(ROUND(${column} / 1000), 'unixepoch', 'localtime')`;