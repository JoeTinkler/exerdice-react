import { Modal } from "@components/Modal";
import styled from "styled-components";
import { ModalSize } from "@components/ui/common/Modal";
import { Header } from "@components/ui/common/Header";
import { Paragraph } from "@components/ui/common/Text";
import { Button } from "@components/ui/common/Button";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 16px;
  width: 100%;
`;

type PropTypes = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  text?: string;
  actions?: { label: string, disabled?: boolean, onClick: () => void }[];
  width?: ModalSize;
}

export const Dialog: React.FC<React.PropsWithChildren<PropTypes>> = ({ children, isOpen, onClose, title, text, actions, width }) => (
  <Modal isOpen={isOpen} onClose={onClose} width={width ?? ModalSize.Small}>
    <Wrapper>
      {title && <Header>{title}</Header>}
      {text && <Paragraph>{text}</Paragraph>}
      {children}
      <ButtonWrapper>
        {actions?.map(({ label, disabled, onClick }, i) => (
          <Button key={label} disabled={disabled} onClick={onClick} $primary={i === 0}>{label}</Button>
        ))}
      </ButtonWrapper>
    </Wrapper>
  </Modal>
);