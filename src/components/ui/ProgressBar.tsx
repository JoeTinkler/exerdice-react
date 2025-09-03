import styled from "styled-components";

export const ProgressBarContainer = styled.div`
  height: 12px;
  border-radius: 10px;
  background: ${({ theme }) => theme.button.background};
  margin: 12px 0;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $percentage: number}>`
  height: 100%;
  width: ${({ $percentage }) => $percentage}%;
  background: ${({ theme }) => theme.highlightColour};
`;