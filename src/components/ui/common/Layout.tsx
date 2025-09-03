import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;