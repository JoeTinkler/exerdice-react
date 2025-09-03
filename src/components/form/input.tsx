import { Input as StyledInput } from "@components/ui/Form";
import { ChangeEvent, useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type PropTypes = React.InputHTMLAttributes<HTMLInputElement> & {
  initialValue: string;
  onChange: (value: string) => void;
};

export const Input: React.FC<PropTypes> = ({ initialValue, onChange, ...props }) => {
  const [value, setValue] = useState(initialValue);

  const onUpdate = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(value);
  }, []);

  return (
    <StyledInput
      {...props}
      value={value}
      onChange={onUpdate}
    />
  )
}

export const DebouncedInput: React.FC<PropTypes> = ({ initialValue, onChange, ...props }) => {
  const [value, setValue] = useState(initialValue);

  const debouncedUpdate = useDebouncedCallback((changeValue: string) => {
    onChange(changeValue);
  }, 2000);

  const onUpdate = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debouncedUpdate(e.target.value);
  }, [debouncedUpdate]);

  return (
    <StyledInput
      {...props}
      value={value}
      onChange={onUpdate}
    />
  )
}
