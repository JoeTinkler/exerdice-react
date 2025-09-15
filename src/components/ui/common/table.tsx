import styled from "styled-components";

export const TableWrapper = styled.div`
  max-width: 100%;
  max-height: 250px;
  overflow: auto;
`;

export const Table = styled.table`
  width: 100%;
  background: ${({ theme }) => theme.input.background};
  color: ${({ theme }) => theme.input.colour};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.button.background};
  border-collapse: separate;
  border-spacing: 0px;
`;

export const TableRow = styled.tr`
  border: none;
  padding: 5px;
  border-radius: 12px;
  background: none;

  &:first-child {
    th:first-child {
      border-radius: 12px 0 0 0;
    }

    th:last-child {
      border-radius: 0 12px 0 0;
    }
  }

  &:last-child {
    td:first-child {
      border-radius: 0 0 0 12px;
    }

    td:last-child {
      border-radius: 0 0 12px 0;
    }
  }
`;

export const TableHeader = styled.th`
  background: ${({ theme }) => theme.button.background};
  color: ${({ theme }) => theme.button.colour};
  font-size: 16px;
  padding: 5px
`;

export const TableHead = styled.thead`
`;

export const TableBody = styled.tbody`
`;

export const TableData = styled.td`
  border: 1px solid ${({ theme }) => theme.button.background};
  padding: 5px 10px;
  text-align: center;
`;