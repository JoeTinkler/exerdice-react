import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: ${({ theme }) => theme.input.background};
  color: ${({ theme }) => theme.input.colour};
  font-size: 14px;
  appearance: none;
  display: block;
  text-align: left;

  &::-webkit-datetime-edit-fields-wrapper {
    text-align: left;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.highlightColour};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: ${({ theme }) => theme.input.background};
  color: ${({ theme }) => theme.input.colour};
  font-size: 14px;
  appearance: none;

  &:focus: {
    outline: 2px solid ${({ theme }) => theme.highlightColour};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: ${({ theme }) => theme.input.background};
  color: ${({ theme }) => theme.input.colour};
  font-size: 14px;
  height: 80px;
  resize: none;

  &:focus: {
    outline: 2px solid ${({ theme }) => theme.highlightColour};
  }
`;

export const Slider = styled.input`
  width: 100%;
  accent-color: ${({ theme }) => theme.highlightColour};
  border: 0;
`;

export const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const Checkbox = styled.input`
  appearance: none;
  margin: 0 auto;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.highlightColour};
  background: ${({ theme }) => theme.input.background};
  cursor: pointer;

  &:checked {
    background: ${({ theme }) => theme.highlightColour};
  }
`;

export const Radiobox = styled.input`
  appearance: none;
  margin: 0 auto;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.highlightColour};
  background: ${({ theme }) => theme.input.background};
  cursor: pointer;

  &:checked {
    background: ${({ theme }) => theme.highlightColour};
  }
`;