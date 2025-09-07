import styled from "styled-components";

export const RouteWrapper = styled.div`
  padding: 20px 20px 0 20px;
  min-height: calc(100vh - 116px);
  margin-bottom: 30px;

  @media screen and (min-width: 800px) {
    min-height: calc(100vh - 164px);
  }
`;