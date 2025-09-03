import styled from "styled-components";

export const Paragraph = styled.p`
  color: ${({ theme }) => theme.secondaryColour};
  font-size: 14px;
`;

export const Label = styled.label`
  font-weight: bold;
  margin: 15px 0 8px;
  display: block;
`;