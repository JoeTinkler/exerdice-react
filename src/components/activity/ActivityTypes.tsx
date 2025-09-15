import { Button } from "@components/ui/common/Button"
import { Card, CardTitle, CardTitleRow, ChevronIcon } from "@components/ui/Card"
import { Label, Paragraph } from "@components/ui/common/Text";
import styled from "styled-components";
import { useContext, useState } from "react";
import { ActivityTypesContext } from "@providers/activityTypes";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@components/ui/common/table";
import { ActivityTypeItem } from "./ActivityTypeItem";

const Loader = styled(Label)`
  display: inline;
  font-size: 12px;
  color: ${({ theme }) => theme.secondaryColour}
`;

export const ActivityTypes: React.FC = () => {
  const { activityTypes, loading, error, insert, update, remove } = useContext(ActivityTypesContext);
  const [show, setShow] = useState(false);
  const [editRow, setEditRow] = useState<number>();

  const onInsert = async () => {
    const id = await insert({ name: '', icon: 'heart' }, (a, b) => b.id - a.id);
    setEditRow(id);
  }

  return (
    <Card>
      <CardTitleRow onClick={() => setShow(!show)}>
        <CardTitle>Activity Types {loading && <Loader>Loading...</Loader> }</CardTitle>
        <ChevronIcon $flip={show} />
      </CardTitleRow>
      {show &&
        <>
          <Button $size={'small'} $primary onClick={onInsert}>Add Activity</Button>
          { error && <Paragraph>{error}</Paragraph> }
          { !loading && !error && activityTypes.length === 0 && <Paragraph>No activity types available. Please add some.</Paragraph> }
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Icon</TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader></TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {activityTypes.map((t) => (
                <ActivityTypeItem
                  key={`activity-types-${t.id}`}
                  activityType={t}
                  showEdit={editRow === t.id}
                  toggleEdit={() => setEditRow(editRow === t.id ? undefined : t.id)}
                  update={update}
                  remove={remove}
                />
              ))}
            </TableBody>
          </Table>
        </>
      }
    </Card>
  )
}