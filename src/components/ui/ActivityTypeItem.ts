import styled from 'styled-components';
import BinAsset from '@assets/icons/bin.svg?react';
import EditAsset from '@assets/icons/edit.svg?react';
import CheckAsset from '@assets/icons/check.svg?react';
import { Button } from './common/Button';
import { Row } from './common/Layout';
import { Input, Select } from './Form';

const Icon = (svg: React.FC<React.SVGProps<SVGSVGElement>>) => styled(svg)`
  width: 15px;
  height: 15px;
  color: #fff;
`;

export const BinIcon = Icon(BinAsset);
export const EditIcon = Icon(EditAsset);
export const CheckIcon = Icon(CheckAsset);

export const IconButton = styled(Button)`
  margin: 0;
  padding: 5px;
`;

export const ButtonRow = styled(Row)`
  margin: 0;
  gap: 5px;
`;

export const NameInput = styled(Input)`
  outline: 2px solid ${({ theme }) => theme.highlightColour};
  padding: 5px;
  border-radius: 5px;
`;

export const IconSelect = styled(Select)`
  outline: 2px solid ${({ theme }) => theme.highlightColour};
  padding: 5px;
  border-radius: 5px;
`;