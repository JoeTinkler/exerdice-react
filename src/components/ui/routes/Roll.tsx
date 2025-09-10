import styled from "styled-components";
import { Card } from "@components/ui/Card";
import { Dice } from "@components/ui/Dice";
import HeartIconAsset from '@assets/activity/heart.svg?react';
import { Paragraph } from "../common/Text";

export const ManualLink = styled(Paragraph)`
  text-decoration: underline;
  text-align: center;
  margin-top: 10px;
`;

export const DiceBox = styled(Card)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0px;
  padding: 20px 10px;
  margin: 20px 0;
`;

export const DiceWrapper = styled.div`
  border: 1px dashed ${({ theme }) => theme.highlightColour};
  border-radius: 5px;
  position: relative;
  padding: 0;
  margin: 15px 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0px;

  div {
    margin: 1px;
  }
`;

export const DiceWrapperLabel = styled.span`
  position: absolute;
  width: 100%;
  text-align: center;
  top: -10px;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: ${({ theme }) => theme.highlightColour};
`;

export const RolledDice = styled(Dice)`
  font-size: 20px;
  width: 55px;
  height: 55px;
  margin: 10px 3px;
`;

export const ResultBox = styled.div`
  background: ${({ theme }) => theme.card.background};
  padding: 15px;
  border-radius: 12px;
  margin: 10px 0;
  text-align: center;
  box-shadow: 0 1px 12px ${({ theme }) => theme.highlightColour};
`;

export const ResultText = styled.h3`
  margin: 5px 0;
  font-weight: bold;

  strong {
    color: ${({ theme }) => theme.highlightColour};
    font-size: 28px;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin: 15px 0;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
`;

export const TipIcon = styled(HeartIconAsset)`
  width: 24px;
  height; 24px;
  margin-right: 5px;
`;