import { Column, Row } from "@components/ui/common/Layout";
import styled from "styled-components";

const TodayContainer = styled(Column)`
  margin-left: auto;
  color: ${({ theme }) => theme.secondaryColour};
  font-size: 14px;
  align-items: end;
`;

const TodayLabel = styled.div`
  font-size: 14px;
`;

const TodayDate = styled.span`
  color: ${({ theme }) => theme.highlightColour};
  font-weight: bold;
  margin-top: 4px;
  text-align: right;
`;

export const Today: React.FC = () => {
  const now = new Date();
  const day = now.toLocaleDateString('en-GB', { weekday: 'long' });
  const date = `${now.toLocaleDateString('en-GB', { month: 'long' })} ${now.getDate()}`;

  return (
    <TodayContainer>
      <TodayLabel>{day}</TodayLabel>
      <TodayDate>{date}</TodayDate>
    </TodayContainer>
  );
}