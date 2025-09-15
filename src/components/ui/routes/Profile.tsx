import styled from "styled-components";
import WarningIconAsset from '@assets/icons/warning.svg?react';
import { Column } from "../common/Layout";

export const ProfilePicWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const ChangePhoto = styled.button`
  background: #333;
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  color: white;
  cursor: pointer;

  &:hover {
    background: #444;
  }
`;

export const SliderContainer = styled.div`
  margin: 15px 0;
`;

export const WarningIcon = styled(WarningIconAsset)`
  color: ${({ theme }) => theme.warningColour};
  width: 15px;
  height: 15px;
  cursor: pointer;
  display: inline;
`;

export const DeveloperLabel = styled(Column)`
  margin-left: auto;
  color: ${({ theme }) => theme.highlightColour};
  font-size: 14px;
  align-items: end;
`;