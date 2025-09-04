import { db } from "@db/db";
import { SQLocalContext } from "@providers/sqLocal";
import { SQLWrapper } from "drizzle-orm";
import { useCallback, useContext, useEffect, useState } from "react";

export const useSQLocalQuery = <TResult>(sql: string | SQLWrapper) => {
  const { initialized } = useContext(SQLocalContext);
  const [data, setData] = useState<TResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const refresh = useCallback(async () => {
    try {
      setError(undefined);
      setLoading(true);
      console.log('useSQLocalQuery Loading', sql);
      const result = await (typeof((sql as any)['execute']) === 'function' ? (sql as any).execute() : db.run(sql)) as TResult[];
      console.log(result);
      setData(result);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [sql]);

  useEffect(() => {
    if (initialized && !loading) {
      refresh();
    }
  }, [initialized])

  return { data, loading, error, refresh };
}