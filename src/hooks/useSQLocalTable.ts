import { db } from "@db/db";
import { SQLocalContext } from "@providers/sqLocal";
import { eq, getTableColumns, getTableName, InferInsertModel, InferSelectModel, Placeholder, SQL } from "drizzle-orm";
import { SQLiteColumn, SQLiteTable } from "drizzle-orm/sqlite-core";
import { useCallback, useContext, useEffect, useMemo, useState } from "react"

export type DatabindConfig<TSelection, TFilters = undefined> = {
  orderBy?: SQLiteColumn | SQL;
  limit?: number | Placeholder
  filters?: {
    defaults: TFilters,
    where: (filters: TFilters) => SQL<unknown> | ((aliases: TSelection) => SQL | undefined) | SQL | undefined
  }
}

export const useSQLocalTable = <T extends SQLiteTable, TFilters = undefined>(schema: T, options?: DatabindConfig<InferSelectModel<T>, TFilters>) => {
  const { initialized } = useContext(SQLocalContext);
  const [data, setData] = useState<InferSelectModel<T>[]>([]);
  const [filters, setFilters] = useState<TFilters | undefined>(options?.filters?.defaults);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const idColumn: SQLiteColumn = useMemo(() => {
    const column = Object.values(getTableColumns(schema)).find((c) => c.primary);
    if (!column) {
      throw new Error('Invalid schema does not contain primary key column');
    }
    return column;
  }, [schema]);

  const defaultSort = useMemo(() => (a: InferSelectModel<T>, b: InferSelectModel<T>) => (a[idColumn.name] as number) - (b[idColumn.name] as number), [idColumn]);

  const refresh = useCallback(async () => {
    try {
      setError(undefined);
      setLoading(true);
      console.log(`useSQLocalTable: Loading ${getTableName(schema)}`);
      const result = await db.select()
        .from(schema)
        .orderBy(options?.orderBy ?? idColumn)
        .where(filters ? options?.filters?.where(filters) : undefined)
        .limit(options?.limit ?? Number.MAX_SAFE_INTEGER);
      setData(result);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [filters, options]);

  const insert = useCallback(async (values: InferInsertModel<T>, sortCompare?: (a: InferSelectModel<T>, b: InferSelectModel<T>) => number) => {
    try {
      setLoading(true);
      const result = await db.insert(schema).values(values).returning({ id: idColumn });
      const id = result[0]?.id;
      if (!id) {
        throw new Error('Could not retrieve ID from insert');
      }
      setData([...data, { ...values, [idColumn.name]: id } as InferSelectModel<T>].sort(sortCompare ?? defaultSort));
      return id as number;
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [filters, data]);

  const update = useCallback(async (id: number, values: Partial<InferInsertModel<T>>) => {
    try {
      setLoading(true);
      console.log(`Update started`)
      await db.update(schema).set(values).where(eq(idColumn as SQLiteColumn, id));
      console.log('Update complete', values)
      setData(data.map((d) => d[idColumn!.name] === id ? { ...d, ...values } : d));
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [filters, data]);

  const remove = useCallback(async (id: number) => {
    try {
      setLoading(true);
      await db.delete(schema).where(eq(idColumn as SQLiteColumn, id));
      setData(data.filter((d) => d[idColumn!.name] !== id));
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [filters, data]);

  useEffect(() => {
    if (initialized && !loading) {
      refresh();
    }
  }, [initialized, filters])

  return { data, loading, error, refresh, insert, update, remove, filters, setFilters }
}