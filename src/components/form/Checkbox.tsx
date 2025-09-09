import { CheckboxLabel, Checkbox as StyledCheckbox } from "@components/ui/Form";

type PropTypes = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<PropTypes> = ({ label, checked, onChange }) => (
  <CheckboxLabel>
    {label}
    <StyledCheckbox type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
  </CheckboxLabel>
);