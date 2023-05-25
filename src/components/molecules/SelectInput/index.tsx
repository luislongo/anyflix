import React, { InputHTMLAttributes } from "react";
import { TInnerRegisterReturn } from "../../../hooks/useInnerForm";
import { FormInput, TFormInputProps } from "../../atoms/FormInput";

export type TSelectInputProps = TInnerRegisterReturn &
  InputHTMLAttributes<HTMLSelectElement> &
  Omit<TFormInputProps, "children">;

export const SelectInput: React.FC<TSelectInputProps> = ({
  error,
  innerRef,
  label,
  required,
  ...props
}) => {
  return (
    <FormInput {...{ error, label, required, disabled: props.disabled }}>
      <select
        {...props}
        ref={innerRef}
        className={` border-2 rounded-md p-2 h-12 w-full transition-all BG ${
          error ? "border-feedback-error" : "border-slate-300"
        }`}
      >
        {props.children}
      </select>
    </FormInput>
  );
};
