import { Link } from "react-router-dom";
import styled from "styled-components";

export const Card = styled.div`
  background: ${({ theme }) => theme.card.background};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
`;

export const CardTitle = styled.h3`
  font-size: 20px;
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