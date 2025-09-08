import { PropsWithChildren, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ActivityTypeIcon } from "@components/activity/ActivityIcon";
import { Activity } from "@db/schema";
import { ActivityTypesContext } from "@providers/activityTypes";

const ActivityCardContainer = styled(Link)`
  color: ${({ theme }) => theme.colour};
  background: ${({ theme }) => theme.card.background};
  border-radius: 12px;
  padding: 12px;
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
`;

const ActivityInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

const ActivityTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ActivityMeta = styled.div`
  color: ${({ theme }) => theme.secondaryColour};
`;

const ActivityStat = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.highlightColour};
  text-align: right;
`;

const Intensity = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.secondaryColour};
  text-align: right;
`;

const SecondaryStat = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.secondaryColour};
  text-align: right;
`;

const intensityLabel = (value: number) => {
  switch (value) {
    case 1: return 'Very Low';
    case 2: return 'Low';
    case 3: return 'Medium';
    case 4: return 'High';
    case 5: return 'Very High';
    default: return 'Unknown';
  }
}

type PropTypes = {
  activity: Activity;
}

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const dateLabel = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  const timeLabel = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  return `${dateLabel} • ${timeLabel}`;
}

export const ActivityCard: React.FC<PropsWithChildren<PropTypes>> = ({ activity }) => {
  const { activityTypes } = useContext(ActivityTypesContext);

  return (
    <ActivityCardContainer to={`/log/${activity.id}`}>
      <ActivityInfo>
        <ActivityTitle>
          <ActivityTypeIcon id={activity.type} />
          {activityTypes.find(type => type.id === activity.type)?.name}
        </ActivityTitle>
        <ActivityMeta>{formatTime(activity.timestamp)}</ActivityMeta>
        <ActivityMeta>{activity.notes || '\u00A0'}</ActivityMeta>
      </ActivityInfo>
      <ActivityInfo>
        <ActivityStat>{activity.minutes ?? 'N/A'} min</ActivityStat>
        <Intensity>{intensityLabel(activity.intensity)} intensity</Intensity>
        {activity.calories && <SecondaryStat>{activity.calories} kcal</SecondaryStat>}
        {activity.distance && <SecondaryStat>{activity.distance} km</SecondaryStat>}
      </ActivityInfo>
    </ActivityCardContainer>
  );
}