import { DashboardContext } from "@providers/dashboard"
import { useContext } from "react"
import { Card, CardTitle } from "./ui/Card";
import { FireIcon } from "./ui/routes/Dashboard";
import { Paragraph } from "./ui/common/Text";
import styled from "styled-components";

const CardParagraph = styled(Paragraph)`
  margin-top: 15px;
`;

const Bold = styled.b`
  color: ${({ theme }) => theme.highlightColour};
`;

export const StreakCard: React.FC = () => {
  const { streakStats, completionPercentage } = useContext(DashboardContext);
  return (
    <Card>
      <CardTitle>{streakStats.current} Day Streak{streakStats.isRecord && <FireIcon />}</CardTitle>
      <CardParagraph>Keep it up, {streakStats.isRecord ? 'this is your highest streak. You are on fire' : `your all time record is ${streakStats.highest} days`}!</CardParagraph>
      {completionPercentage < 100 &&
        <CardParagraph><Bold>Don't lose your streak!</Bold> Complete your daily activities to mtaintain your streak</CardParagraph>
      }
    </Card>
  )
}