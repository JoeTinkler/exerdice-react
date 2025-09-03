import styled from "styled-components";

export const Header = styled.h1`
  color: ${({ theme }) => theme.titleColour};
  text-align: center;
  margin-bottom: 20px;
`;

export const SubHeader = styled.h2`
  font-size: 15px;
  margin-top: 20px;
  font-weight: bold;
`;
