import { Button } from "@components/ui/common/Button"
import { Card, CardTitle } from "@components/ui/Card"
import { Label, Paragraph } from "@components/ui/common/Text";
import { useActivityTypes } from "@hooks/useActivityTypes"
import { ActivityIcon } from "./ActivityIcon";
import { Column, Row } from "@components/ui/common/Layout";
import { Input, Select } from "@components/ui/Form";
import styled from "styled-components";
import BinAsset from '@assets/icons/bin.svg?react';
import { ActivityType } from "@db/schema";
import { ChangeEvent, useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const BinIcon = styled(BinAsset)`
  width: 15px;
  height: 15px;
  color: #fff;
`;

const BinButton = styled(Button)`
  margin: 0;
  padding: 10px;
`;

export const ActivityTypeContainer = styled(Row)`
  position: relative;
  background-color: ${({ theme }) => theme.listItems.background};
  padding: 10px;
  border-bottom: 1px solid #fff;
  gap: 5px;
  margin-bottom: 0;

  &:last-child {
    border: 0;
  }
`;

const ActivityTypeLabel = styled(Label)`
  font-size: 14px;
`;

const Loader = styled(Label)`
  display: inline;
  font-size: 12px;
  color: ${({ theme }) => theme.secondaryColour}
`;

type PropTypes = {
  activityType: ActivityType;
  update: (id: number, patch: Partial<ActivityType>) => void;
  remove: (id: number) => void;
}

const ActivityTypeItem: React.FC<PropTypes> = ({ activityType, update, remove }) => {
  const [name, setName] = useState(activityType.name);
  const [icon, setIcon] = useState(activityType.icon);

  const debouncedUpdate = useDebouncedCallback((patch: Partial<ActivityType>) => {
    update(activityType.id, patch);
  }, 2000);

  const onUpdateName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    debouncedUpdate({ name: e.target.value });
  }, [debouncedUpdate]);

  const onUpdateIcon = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setIcon(e.target.value  as any);
    update(activityType.id, { icon: e.target.value as any });
  }, [activityType]);

  return (
    <ActivityTypeContainer>
      <ActivityIcon icon={activityType.icon} />
      <Column>
        <ActivityTypeLabel>Name</ActivityTypeLabel>
        <Input
          type="text"
          value={name}
          onChange={onUpdateName}
        />
      </Column>
      <Column>
        <ActivityTypeLabel>Icon</ActivityTypeLabel>
        <Select
          value={icon ?? 'heart'}
          onChange={onUpdateIcon}
        >
          <option value={'bicycle'}>Bicycle</option>
          <option value={'dumbbell'}>Dumbbell</option>
          <option value={'swim'}>Swim</option>
          <option value={'heart'}>Heart</option>
          <option value={'run'}>Run</option>
          <option value={'walk'}>Walk</option>
        </Select>
      </Column>
      <Column>
        <ActivityTypeLabel>&nbsp;</ActivityTypeLabel>
        <BinButton $size="small" onClick={() => remove(activityType.id)}>
          <BinIcon />
        </BinButton>
      </Column>
    </ActivityTypeContainer>
  )
}

export const ActivityTypes: React.FC = () => {
  const { activityTypes, loading, error, insert, update, remove } = useActivityTypes();
  return (
    <Card>
      <CardTitle>Activity Types {loading && <Loader>Loading...</Loader> }</CardTitle>
      <Button $size={'small'} $primary onClick={() => insert({ name: '', icon: 'heart' }, (a, b) => b.id - a.id)}>
        Add Activity
      </Button>
      { error && <Paragraph>{error}</Paragraph> }
      { !loading && !error && activityTypes.length === 0 && <Paragraph>No activity types available. Please add some.</Paragraph> }
      { activityTypes.map((activityType) => (
        <ActivityTypeItem key={activityType.id} activityType={activityType} update={update} remove={remove} />
      ))}
    </Card>
  )
}