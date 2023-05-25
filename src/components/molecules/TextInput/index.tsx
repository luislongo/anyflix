import React, { InputHTMLAttributes } from "react";
import { TInnerRegisterReturn } from "../../../hooks/useInnerForm";
import { FormInput, TFormInputProps } from "../../atoms/FormInput";

export type TTextInputProps = TInnerRegisterReturn &
  InputHTMLAttributes<HTMLInputElement> &
  Omit<TFormInputProps, "children">;

export const TextInput: React.FC<TTextInputProps> = ({
  error,
  innerRef,
  label,
  required,
  ...props
}) => {
  return (
    <FormInput {...{ error, label, required, disabled: props.disabled }}>
      <input
        {...props}
        ref={innerRef}
        className={`appearance-none outline-none border-2 px-2 rounded-md 
        w-full transition-all h-12 text-xl font-sans font-light 
        ${
          error
            ? "border-feedback-error text-feedback-error"
            : "border-slate-300 focus:border-slate-500"
        }
        `}
      />
    </FormInput>
  );
};
