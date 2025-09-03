import styled from "styled-components";
import DiceIconAsset from "@assets/icons/d20.svg?react";
import HistoryIconAsset from "@assets/icons/clock-reverse.svg?react";
import ProfileIconAsset from "@assets/icons/profile-circle.svg?react";
import FireIconAsset from "@assets/icons/fire.svg?react";
import { Row } from "@components/ui/common/Layout";
import { Dice } from "@components/ui/Dice";
import { Paragraph } from "../common/Text";

export const CompletedLabel = styled.span`
  font-size: 12px;
  float: right;
`;

export const NotRolledLabel = styled.span`
  font-size: 18px;
  text-decoration: italic;
`;

export const Metrics = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  text-align: center;
`;

export const Metric = styled.div`
  display: block;
`;

export const MetricNumber = styled.span<{ $highlight?: boolean }>`
  color: ${({ theme, $highlight }) => ($highlight ? theme.highlightColour : theme.colour)};
  font-weight: bold;
  font-size: 30px;
  display: block;
`;

export const MetricLabel = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.secondaryColour};
`;

export const DiceRow = styled(Row)`
  justify-content: center;
  flex-wrap: wrap;
`;

export const ChallengeText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.secondaryColour};
  strong {
    display: block;
    font-size: 18px;
    color: ${({ theme }) => theme.colour}
    margin-top: 10px;
  }
`;

export const RemainingRestsLabel = styled(Paragraph)`
  text-align: center;
  margin-bottom: 15px;
`

export const ModifierDice = styled(Dice)`
  width: 24px;
  height: 24px;
  font-size: 12px;
  margin-left: auto;
`;

const DashboardIcon = (svg: React.FC<React.SVGProps<SVGSVGElement>>) => styled(svg)`
  width: 24px;
  height: 24px;
  margin-left: auto;
  color: ${({ theme }) => theme.highlightColour};
`;

export const DiceIcon = DashboardIcon(DiceIconAsset);
export const HistoryIcon = DashboardIcon(HistoryIconAsset);
export const ProfileIcon = DashboardIcon(ProfileIconAsset);
export const FireIcon = DashboardIcon(FireIconAsset);