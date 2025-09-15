import { Link } from "react-router-dom";
import styled from "styled-components";
import { Paragraph } from "./common/Text";
import ChevronAsset from "@assets/icons/chevron-down.svg?react";
import { Row } from "@components/ui/common/Layout";

export const ChevronIcon = styled(ChevronAsset)<{ $flip: boolean }>`
  transform: rotate(${({ $flip }) => $flip ? '180' : '0'}deg);
  width: 25px;
  height: 25px;
  margin: 0 auto;
`;

export const CardTitleRow = styled(Row)`
  cursor: pointer;
  margin: 0;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.card.background};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
`;

export const CardTitle = styled.h3`
  font-size: 20px;
  width: 100%;
`;

export const CardParagraph = styled(Paragraph)`
  margin-top: 15px;
`;

export const GridCard = styled(Link)`
  background: ${({ theme }) => theme.card.background};
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  font-size: 12px;
  color: ${({ theme }) => theme.secondaryColour};
  cursor: pointer;
  text-decoration: none;
  strong {
    display: block;
    font-size: 14px;
    margin: 6px 0 12px 0;
    color: ${({ theme }) => theme.colour};
  }
`;