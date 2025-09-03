import { Link } from "react-router-dom";
import styled from "styled-components";

export const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const RecentActivities = styled.div`
  margin-top: 20px;
`;

export const HistoryLink = styled(Link)`
  text-align: center;
  color: ${({ theme }) => theme.highlightColour};
  font-weight: bold;
  margin-top: 15px;
  cursor: pointer;
  text-decoration: none;
  display: block;
`;