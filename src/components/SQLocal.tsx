import { Button } from "@components/ui/common/Button";
import { Card, CardTitle } from "@components/ui/Card";
import { TextArea } from "@components/ui/Form";
import { activities, activity_types, dice_rolls, migrations, rests, rolls } from "@db/schema";
import { useSQLocalTable } from "@hooks/useSQLocalTable";
import { getTableColumns, getTableName } from "drizzle-orm";
import { SQLiteTable } from "drizzle-orm/sqlite-core";
import { Table, TableData, TableHeader, TableRow } from "./ui/common/table";
import { startOfDayUnix } from "@helpers/date";
import { useSQLocalQueryText } from "@hooks/useSQLocalQueryText";
import styled from "styled-components";
import { useContext } from "react";
import { ProfileContext } from "@providers/profile";

const QueryBox = styled(TextArea)`
  resize: vertical;
  min-height: 250px;
`;

const ResultBox = styled(TextArea)`
  min-height: 500px;
`;

const TimeSpan: React.FC<{ value: number }> = ({ value }) => {
  const date = new Date(value);
  return (<span> ({date.toLocaleDateString()} {date.toLocaleTimeString()})</span>)
}

const DataTable: React.FC<{ schema: SQLiteTable}> = ({ schema }) => {
  const { data, loading, error, refresh } = useSQLocalTable(schema);
  const columns = Object.values(getTableColumns(schema));

  return (
    <Card>
      <CardTitle>{getTableName(schema)}{loading && <span> Loading...</span>}{error && <span> {JSON.stringify(error, null, 2)}</span>}</CardTitle>
      <Button onClick={refresh}>Refresh</Button>
      <Table>
        <thead>
          <TableRow>{columns.map((c) => (<TableHeader>{c.name}</TableHeader>))}</TableRow>
        </thead>
        <tbody>
          {data.map((d) => (<TableRow>{columns.map((c) => (<TableData>{d[c.name]}{c.name === 'timestamp' && <TimeSpan value={d[c.name] as number} />}</TableData>))}</TableRow>))}
        </tbody>
      </Table>
    </Card>
  )
}

export const SQLocal: React.FC = () => {
  const { profile } = useContext(ProfileContext);
  const { data, loading, error, refresh, query, setQuery } = useSQLocalQueryText(`SELECT * FROM activities WHERE timestamp >= ${startOfDayUnix(profile.startOfDayOffset)}`);
  return (
    <>
      <Card>
        <CardTitle>Query Data {loading && <span> Loading...</span>}{error && <span> {JSON.stringify(error, null, 2)}</span>}</CardTitle>
        <QueryBox value={query} onChange={(e) => setQuery(e.target.value)} rows={15} />
        <Button onClick={refresh}>Run Query</Button>
        <ResultBox value={JSON.stringify(data ?? [], null, 2)} rows={20} readOnly={true} />
      </Card>

      <DataTable schema={rolls} />
      <DataTable schema={dice_rolls} />
      <DataTable schema={activities} />
      <DataTable schema={rests} />
      <DataTable schema={activity_types} />
      <DataTable schema={migrations} />
    </>
  );
}