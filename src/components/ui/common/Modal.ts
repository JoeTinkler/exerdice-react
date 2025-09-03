import styled from "styled-components";

export enum ModalSize {
  Small = '500px',
  Medium = '800px',
  Large = 'calc(100% - 80px)',
}

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div<{ $width?: ModalSize }>`
  background: ${({ theme }) => theme.background};
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 100%;
  max-width: ${({ $width }) => $width ?? 'calc(100% - 80px)'};
  max-height: calc(100% - 80px);
  overflow-y: auto;
`;