import CoffeeIconAsset from '@assets/icons/coffee.svg?react';
import { Card, CardParagraph, CardTitle } from '@components/ui/Card';
import { Paragraph } from '@components/ui/common/Text';
import { toRGBA } from "@helpers/colour";
import styled from 'styled-components';
import { Button } from './ui/common/Button';
import { Dialog } from './ui/common/Dialog';
import { useState } from 'react';

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
  margin: 15px auto 25px auto;
`;

type PropTypes = {
  weekRestCount: number;
  weeklyRestDays: number;
  onCancel: () => Promise<void>;
}

export const RestCard: React.FC<PropTypes> = ({ weekRestCount, weeklyRestDays, onCancel }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const onClose = () => {
    setIsConfirmOpen(false);
  }
  const onConfirm = async () => {
    await onCancel();
    onClose();
  }
  return (
    <>
      <StyledCard>
        <CardTitle>It's a rest day</CardTitle>
        <CardParagraph>Kick back and relax until tomorrow</CardParagraph>
        <Paragraph>Used {weekRestCount}/{weeklyRestDays} rest days this week</Paragraph>
        <RestIconWrapper>
          <RestIcon />
        </RestIconWrapper>
        <CardParagraph>Feeling inspired? Cancel your rest day and roll your dice!</CardParagraph>
        <Button onClick={() => setIsConfirmOpen(true)}>Cancel Rest</Button>
      </StyledCard>
      <Dialog
        isOpen={isConfirmOpen}
        onClose={onClose}
        title={'Cancel Rest'}
        text={'Are you sure you want to cancel your rest day?'}
        actions={[
          { label: 'Confirm', onClick: onConfirm },
          { label: 'Cancel', onClick: onClose }
        ]}
      />
    </>
  );
}