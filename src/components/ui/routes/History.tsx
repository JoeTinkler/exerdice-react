import styled from "styled-components";

export const ToggleButtons = styled.div`
  display: flex;
  gap: 4px;
  margin-left: auto;
`;

export const ToggleButton = styled.button<{ $active?: boolean }>`
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  background: ${({ theme, $active }) => ($active ? theme.highlightColour : theme.button.background)};
  color: ${({ $active, theme }) => ($active ? theme.colour : theme.button.colour)};
  text-decoration: none;
`;

export const SummaryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const SummaryMetrics = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  div {
    text-align: center;
    font-size: 14px;
  }
  span {
    display: block;
    font-size: 22px;
    font-weight: bold;
    color: ${({ theme }) => theme.highlightColour};
  }
`;

export const DaySummaryContainer = styled.span`
  color: ${({ theme }) => theme.secondaryColour};
  font-size: 14px;
`;

export const ActivitySeparator = styled.hr`
  background-color: ${({ theme }) => theme.secondaryColour};
  height: 1px;
  border: 0;
  margin: 15px 0;
`;