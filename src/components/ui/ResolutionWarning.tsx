import styled from "styled-components";

export const ResolutionWarning = styled.h1`
  display: none;
  background: ${({ theme }) => theme.warningColour};
  color: ${({ theme }) => theme.button.colour};
  width: 100%;
  font-size: 16px;
  margin: 0;
  padding: 15px;
  text-align: center;

  @media screen and (min-width: 800px) {
    display: block;
  }
`;