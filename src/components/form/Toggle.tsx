import { useCallback, useState } from "react";
import styled from "styled-components";

const ToggleContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const ToggleSlider = styled.span<{ $checked: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ $checked, theme }) => $checked ? theme.highlightColour : theme.input.background};
  transition: .4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.input.colour};
    transition: .4s;
    ${({ $checked }) => $checked ? 'transform: translateX(26px);' : ''}
  }
`;

type PropTypes = {
  checked: boolean;
  onChange: (value: boolean) => void;
};

export const Toggle: React.FC<PropTypes> = ({ checked, onChange }) => {
  const [value, setValue] = useState(checked);

  const onToggle = useCallback(() => {
    setValue(!value);
    onChange(!value);
  }, [value]);

  return (
    <ToggleContainer onClick={onToggle}>
      <ToggleSlider $checked={value} />
    </ToggleContainer>
  )
}