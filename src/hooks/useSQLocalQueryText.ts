import { useEffect, useState } from "react";
import { SQLocal as SQLocalConnect } from 'sqlocal';

// Create a client with a name for the SQLite file to save in
// the origin private file system
const { sql } = new SQLocalConnect('database.sqlite3');

export const useSQLocalQueryText = <T>(initialQuery?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [query, setQuery] = useState(initialQuery);
  const [data, setData] = useState<T[]>([]);

  const refresh = async () => {
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      setError(undefined);
      const response = await sql(query);
      setData(response as T[]);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!loading) {
      refresh();
    }
  }, []);

  return { data, loading, error, refresh, query, setQuery }
}