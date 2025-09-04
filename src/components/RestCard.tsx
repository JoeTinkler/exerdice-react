import CoffeeIconAsset from '@assets/icons/coffee.svg?react';
import { Card, CardTitle } from '@components/ui/Card';
import { Paragraph } from '@components/ui/common/Text';
import { toRGBA } from "@helpers/colour";
import styled from 'styled-components';

const StyledCard = styled(Card)`
  margin-top: 15px;
`;

const RestIconWrapper= styled.div`
  margin: 25px 0 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const RestIcon = styled(CoffeeIconAsset)`
  width: 100px;
  height; 100px;
  background: radial-gradient(ellipse at 50% -50%, ${({ theme }) => toRGBA(theme.highlightColour, 0)}, ${({ theme }) => toRGBA(theme.highlightColour, 0.15)} 30%);
  border-radius: 50px;
  padding: 15px;
  color: ${({ theme }) => theme.highlightColour};
  transition: transform .08s ease, box-shadow .2s ease;
  box-shadow: 0 0px 36px ${({ theme }) => theme.highlightColour};
`;

type PropTypes = {
  weekRestCount: number;
  weeklyRestDays: number;
}

export const RestCard: React.FC<PropTypes> = ({ weekRestCount, weeklyRestDays }) => (
  <StyledCard>
    <CardTitle>It's a rest day</CardTitle>
    <Paragraph>Kick back and take it easy until tomorrow</Paragraph>
    <Paragraph>Used {weekRestCount}/{weeklyRestDays} rest days this week</Paragraph>
    <RestIconWrapper>
      <RestIcon />
    </RestIconWrapper>
  </StyledCard>
);