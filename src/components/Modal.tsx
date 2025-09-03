import { PropsWithChildren, useEffect } from "react";
import { ModalContent, ModalSize, Modal as StyledModal } from "@components/ui/common/Modal";
import Portal from "./Portal";

type PropTypes = {
  onClose: () => void;
  width?: ModalSize;
  isOpen: boolean;
}

export const Modal: React.FC<PropsWithChildren<PropTypes>> = ({ children, onClose, width, isOpen }) => {
  useEffect(() => {
    const closeOnEscapeKey = (event: KeyboardEvent) => { if (event.key === "Escape") { onClose(); } };
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [onClose]);

  return isOpen && (
      <StyledModal onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()} $width={width}>
          {children}
        </ModalContent>
      </StyledModal>
  );
}