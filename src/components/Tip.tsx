import styled from "styled-components";
import { Card, CardParagraph, CardTitle, CardTitleRow } from "./ui/Card";
import HeartIconAsset from '@assets/activity/heart.svg?react';
import DiceIconAsset from '@assets/icons/d20.svg?react';
import { PropsWithChildren } from "react";

export const TipList = styled.ul`
  margin-top: 15px;
`;

export const TipListItem = styled.li`
  margin: 10px;
  color: ${({ theme }) => theme.secondaryColour};
  font-size: 14px;

  b {
    color: ${({ theme }) => theme.highlightColour};
  }
`;

const Icon = (svg: React.FC<React.SVGProps<SVGSVGElement>>) => styled(svg)`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  color: ${({ theme }) => theme.highlightColour};
`;

const HeartIcon = Icon(HeartIconAsset);
const DiceIcon = Icon(DiceIconAsset);

type PropTypes = {
  title?: string;
  text?: string;
  icon?: 'heart' | 'd20';
}

export const Tip: React.FC<PropsWithChildren<PropTypes>> = ({ title, text, icon, children }) => (
  <Card>
    {title &&
      <CardTitleRow>
        {icon === 'heart' && <HeartIcon />}
        {icon === 'd20' && <DiceIcon />}
        <CardTitle>{title ?? 'Tip'}</CardTitle>
      </CardTitleRow>
    }
    {text && <CardParagraph>{text}</CardParagraph>}
    {children}
  </Card>
)