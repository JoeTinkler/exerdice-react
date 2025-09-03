import { Button } from "@components/ui/common/Button";
import { Card, CardTitle } from "@components/ui/Card";
import { TextArea } from "@components/ui/Form";
import { Paragraph } from "@components/ui/common/Text";
import { activity_types, ActivityType } from "@db/schema";
import { DatabindConfig, useSQLocalTable } from "@hooks/useSQLocalTable";
import { gte } from "drizzle-orm";
import { useMemo } from "react";

type ActivityTypeFilters = {
  id: number
}

const databindOptions: DatabindConfig<ActivityType, ActivityTypeFilters> = {
  orderBy: activity_types.name,
  filters: {
    defaults: {
      id: 0
    },
    where: ({ id }) => (gte(activity_types.id, id))
  }
}

export const SQLocal: React.FC = () => {
  const { data, loading, error, refresh, insert, update, remove, setFilters } = useSQLocalTable(activity_types, databindOptions);
  const content = useMemo(() => {
    if (loading) {
      return <Paragraph>Loading...</Paragraph>;
    }
    if (error) {
      return <Paragraph>{JSON.stringify(error, null, 2)}</Paragraph>;
    }
    if (data) {
      return (
        <TextArea value={JSON.stringify(data, null, 2)} rows={20} />
      );
    }
  }, [data, loading]);

  const onInsert = () => {
    insert({ name: 'Tester', icon: 'heart' });
  }

  const onUpdate = () => {
    update(data[data.length -1].id, { name: 'Updated' });
  }

  const onRemove = () => {
    remove(data[data.length -1].id)
  }

  return (
    <Card>
      <CardTitle>Local Database</CardTitle>
      <Button onClick={() => refresh() }>Run Query</Button>
      <Button onClick={onInsert}>Insert</Button>
      <Button onClick={onUpdate}>Update</Button>
      <Button onClick={onRemove}>Delete</Button>
      <Button onClick={() => setFilters({ id: 3 })}>Filter</Button>
      <Button onClick={() => setFilters({ id: 0 })}>Clear Filters</Button>
      {content}
    </Card>
  );
}