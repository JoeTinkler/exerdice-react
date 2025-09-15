import React from "react";
import styled, { keyframes } from "styled-components";
import { Button } from "@components/ui/common/Button";
import CrossIconAsset from '@assets/icons/cross.svg?react';

export const ToastsContainer = styled.div`
  position: fixed;
  top: 10px;
  padding: 10px;
  right: 10px;
  width: 350px;
  z-index: 1301;
  max-height: 80%;
  overflow-y: auto;
`;

const fadeOut = keyframes`
  from {opacity: 1;}
  to {opacity: 0;}
`;

export const ToastContainer = styled.div<{ $type: ToastType; $duration?: number }>`
  background-color: ${({ theme, $type }) => {
    switch ($type) {
      case "info":
        return theme.toast.info;
      case "success":
        return theme.toast.success;
      case "error":
        return theme.toast.error;
      default:
        return theme.button.background;
    }
  }};
  color: ${({ theme }) => theme.button.colour};
  display: flex;
  z-index: 1;
  border-radius: 7px;
  padding: 15px 30px 15px 15px;
  margin-bottom: 10px;
  cursor: pointer;
  animation-name: ${(props) => (props.$duration ? fadeOut : "")};
  animation-duration: 2s;
  animation-delay: ${(props) => Math.max((props.$duration ?? 0) - 2, 0)}s;
  animation-fill-mode: forwards;
  position: relative;
`;

export const ToastText = styled.p`
  color: ${({ theme }) => theme.button.colour};
  font-size: 14px;
  line-height: 1.4;
`;

export const ToastDismiss = styled(CrossIconAsset)`
  color: ${({ theme }) => theme.button.colour};
  position: absolute;
  top: 12px;
  right: 15px;
  height: 25px;
  width: 25px;
  cursor: pointer;
  background: none;
  border: none;
`;

type PropTypes = {
  toast: Toast;
  onDismiss: () => void;
};

export const ToastItem: React.FC<PropTypes> = ({ toast, onDismiss }) => (
  <ToastContainer $type={toast.type} $duration={toast.duration} onClick={onDismiss}>
    <ToastText>{toast.text}</ToastText>
    {toast.buttons?.map(({ label, handler }, i) => (
      <Button key={`toast-action-${i}-${label}`} onClick={() => handler()}>
        {label}
      </Button>
    ))}
    <ToastDismiss onClick={onDismiss} />
  </ToastContainer>
);