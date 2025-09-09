import { CheckboxGroup, CheckboxLabel, Radiobox as StyledRadiobox } from "@components/ui/Form";

type PropTypes = {
  value: string;
  options: { label: string; name: string; value: string}[];
  onChange: (checked: string) => void;
}

export const Radiobox: React.FC<PropTypes> = ({ value, options, onChange }) => (
  <CheckboxGroup>
    {options.map((option) => (
      <CheckboxLabel key={option.value}>
        {option.label}
        <StyledRadiobox type="radio" checked={value === option.value} onChange={() => onChange(option.value)} />
      </CheckboxLabel>
  ))}
  </CheckboxGroup>
);