import React, { InputHTMLAttributes } from "react";
import { TInnerRegisterReturn } from "../../../hooks/useInnerForm";
import { FormInput, TFormInputProps } from "../../atoms/FormInput";

export type TDateInputProps = TInnerRegisterReturn &
  InputHTMLAttributes<HTMLInputElement> &
  Omit<TFormInputProps, "children">;

export const DateInput: React.FC<TDateInputProps> = ({
  error,
  label,
  required,
  ...props
}) => {
  return (
    <FormInput {...{ error, label, required, disabled: props.disabled }}>
      <input type="date" {...props} className="h-12 px-2" />
    </FormInput>
  );
};
