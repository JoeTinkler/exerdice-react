import { Button } from "@components/ui/common/Button";
import { Card, CardTitle, CardTitleRow, ChevronIcon } from "@components/ui/Card";
import { TextArea } from "@components/ui/Form";
import Editor from 'react-simple-code-editor';
import { highlight } from 'sql-highlight';
import { activities, activity_types, dice_rolls, migrations, rests, rolls } from "@db/schema";
import { useSQLocalTable } from "@hooks/useSQLocalTable";
import { getTableColumns, getTableName } from "drizzle-orm";
import { SQLiteTable } from "drizzle-orm/sqlite-core";
import { Table, TableBody, TableData, TableHead, TableHeader, TableRow, TableWrapper } from "@components/ui/common/table";
import { startOfDayUnix } from "@helpers/date";
import { useSQLocalQueryText } from "@hooks/useSQLocalQueryText";
import styled, { createGlobalStyle } from "styled-components";
import { useContext, useEffect, useRef, useState } from "react";
import { ProfileContext } from "@providers/profile";

const CodeStyles = createGlobalStyle`
  code.sql {
    background: ${({ theme }) => theme.input.background};
    border-radius: 12px;
  }

  .sql-hl-keyword {
    color: ${({ theme }) => theme.syntax.keyword};
  }
  .sql-hl-function {
    color: ${({ theme }) => theme.syntax.function};
  }
  .sql-hl-number {
    color: ${({ theme }) => theme.syntax.number};
  }
  .sql-hl-string {
    color: ${({ theme }) => theme.syntax.string};
  }
  .sql-hl-special {
    color: ${({ theme }) => theme.syntax.default};
  }
  .sql-hl-bracket {
    color: ${({ theme }) => theme.syntax.default};
  }
`;

const QueryBox = styled(Editor)`
  margin-top: 15px;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: ${({ theme }) => theme.input.background};

  textarea:focus {
    outline: none;
  }
`;

const ResultBox = styled(TextArea)`
  height: auto;

  &:focus {
    outline: none;
  }
`;

const TimeSpan: React.FC<{ value: number }> = ({ value }) => {
  const date = new Date(value);
  return (<span> ({date.toLocaleDateString()} {date.toLocaleTimeString()})</span>)
}

const DataCard: React.FC<{ schema: SQLiteTable}> = ({ schema }) => {
  const [showData, setShowData] = useState(false);
  return (
    <Card>
      <CardTitleRow onClick={() => setShowData(!showData)}>
        <CardTitle>{getTableName(schema)}</CardTitle>
        <ChevronIcon $flip={showData} />
      </CardTitleRow>
      {showData && <DataTable schema={schema} />}
    </Card>
  );
}

const DataTable: React.FC<{ schema: SQLiteTable}> = ({ schema }) => {
  const { data, loading, error, refresh } = useSQLocalTable(schema);
  const columns = getTableColumns(schema);
  const columnValues = Object.values(columns);
  const columnKeys = Object.keys(columns);
  const tableName = getTableName(schema);

  return (
    <>
      {error && <span> {JSON.stringify(error, null, 2)}</span>}
      <Button onClick={refresh} disabled={loading}>{loading ? 'Loading...' : 'Refresh'}</Button>
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>{columnValues.map((c) => (<TableHeader>{c.name}</TableHeader>))}</TableRow>
          </TableHead>
          <TableBody>
            {data.map((d, r) => (<TableRow key={`${tableName}-${r}`}>{columnValues.map((c, i) => (<TableData key={`${tableName}-${r}-${i}`}>{d[columnKeys[i]]}{c.name === 'timestamp' && <TimeSpan value={d[c.name] as number} />}</TableData>))}</TableRow>))}
          </TableBody>
        </Table>
      </TableWrapper>
    </>
  )
}

export const SQLocal: React.FC = () => {
  const { profile } = useContext(ProfileContext);
  const { data, loading, error, refresh, query, setQuery } = useSQLocalQueryText(`SELECT * FROM activities WHERE timestamp >= ${startOfDayUnix(profile.startOfDayOffset)}`);
  const resultBoxRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (data && resultBoxRef.current) {
      console.log(resultBoxRef.current.scrollHeight);
      resultBoxRef.current.style.height = resultBoxRef.current.scrollHeight + 'px';
    }
  }, [data]);

  return (
    <>
      <CodeStyles />
      <Card>
        <CardTitle>Query Data {loading && <span> Loading...</span>}{error && <span> {JSON.stringify(error, null, 2)}</span>}</CardTitle>
        <QueryBox
          value={query ?? ''}
          onValueChange={code => setQuery(code)}
          highlight={code => highlight(code, { html: true })}
          padding={12}
        />
        <Button onClick={refresh}>Run Query</Button>
        {data && <ResultBox value={JSON.stringify(data, null, 2)} readOnly={true} ref={resultBoxRef} />}
      </Card>

      <DataCard schema={rolls} />
      <DataCard schema={dice_rolls} />
      <DataCard schema={activities} />
      <DataCard schema={rests} />
      <DataCard schema={activity_types} />
      <DataCard schema={migrations} />
    </>
  );
}