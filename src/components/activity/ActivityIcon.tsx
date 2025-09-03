import styled from "styled-components";
import BicycleIconAsset from '@assets/activity/bicycle.svg?react';
import DumbbellIconAsset from '@assets/activity/dumbbell.svg?react';
import SwimIconAsset from '@assets/activity/swim.svg?react';
import HeartIconAsset from '@assets/activity/heart.svg?react';
import RunIconAsset from '@assets/activity/run.svg?react';
import WalkIconAsset from '@assets/activity/walk.svg?react';
import { ActivityIcon as IconPath } from "@db/schema";
import { useContext } from "react";
import { ActivityTypesContext } from "@providers/activityTypes";

const StyledIcon = (svg: React.FC<React.SVGProps<SVGSVGElement>>) => styled(svg)`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.highlightColour};
`;

export const BicycleIcon = StyledIcon(BicycleIconAsset);
export const DumbbellIcon = StyledIcon(DumbbellIconAsset);
export const SwimIcon = StyledIcon(SwimIconAsset);
export const HeartIcon = StyledIcon(HeartIconAsset);
export const RunIcon = StyledIcon(RunIconAsset);
export const WalkIcon = StyledIcon(WalkIconAsset);

type PropTypes = {
  id?: number | null;
}

export const ActivityTypeIcon: React.FC<PropTypes> = ({ id }) => {
  const { activityTypes } = useContext(ActivityTypesContext);
  const type = activityTypes?.find((t) => t.id === id);
  return <ActivityIcon icon={type?.icon} />
}

type IconPropTypes = React.SVGAttributes<SVGElement> & {
  icon?: IconPath | null;
}

export const ActivityIcon: React.FC<IconPropTypes> = ({ icon, ...props }) => {
  switch (icon) {
    case 'bicycle': return <BicycleIcon {...props} />;
    case 'dumbbell': return <DumbbellIcon {...props} />;
    case 'swim': return <SwimIcon {...props} />;
    case 'run': return <RunIcon {...props} />;
    case 'walk': return <WalkIcon {...props} />;
    default:
    case 'heart': return <HeartIcon {...props} />;
  }
}