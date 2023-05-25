import React, { InputHTMLAttributes } from "react";
import { TInnerRegisterReturn } from "../../../hooks/useInnerForm";
import { FormInput, TFormInputProps } from "../../atoms/FormInput";
import { CheckInput, TCheckInputProps } from "../CheckInput";

export type TRadioGroupOptionProps = {
  value: string;
  children: React.ReactNode;
};

export type TRadioGroupProps = TInnerRegisterReturn &
  InputHTMLAttributes<HTMLInputElement> &
  Omit<TFormInputProps, "children"> & {
    options: TRadioGroupOptionProps[];
  };

export const RadioGroup: React.FC<TRadioGroupProps> = ({
  error,
  label,
  required,
  options,
  ...props
}) => {
  return (
    <FormInput {...{ error, label, required, disabled: props.disabled }}>
      {options?.map((option, index) => (
        <CheckInput type="radio" {...props} key={index} value={option.value}>
          {option.children}
        </CheckInput>
      ))}
    </FormInput>
  );
};
