import React, { InputHTMLAttributes } from "react";
import { TInnerRegisterReturn } from "../../../hooks/useInnerForm";
import { FormInput, TFormInputProps } from "../../atoms/FormInput";

export type TCheckInputProps = TInnerRegisterReturn &
  InputHTMLAttributes<HTMLInputElement> &
  Omit<TFormInputProps, "children">;

export const CheckInput: React.FC<TCheckInputProps> = ({
  error,
  innerRef,
  label,
  required,
  type = "checkbox",
  children,
  ...props
}) => {
  return (
    <FormInput {...{ error, label, required, disabled: props.disabled }}>
      <div className="flex flex-row items-center gap-2 text-sm text-slate-100">
        <input
          {...props}
          ref={innerRef}
          type={type}
          className={`h-4.5 w-4.5 appearance-none bg-slate-100 border-2 border-slate-400 hover:border-primary-600 checked:bg-primary-400 hover:checked:bg-primary-600 focus:outline-none rounded-sm focus:ring-0 focus:ring-inset-0 focus:checked:bg-primary-400 transition-all
          ${error && "text-red-500"}`}
        />
        {children}
      </div>
    </FormInput>
  );
};
