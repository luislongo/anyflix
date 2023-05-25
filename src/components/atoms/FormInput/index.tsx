export type TError = {
  message?: string;
};

export type TFormInputProps = {
  children?: React.ReactNode;
  disabled?: boolean;
  error?: TError | undefined;
  label?: string;
  required?: boolean;
};

export const FormInput: React.FC<TFormInputProps> = ({
  children,
  disabled,
  error,
  label,
  required,
}) => {
  return (
    <div>
      <div className="flex flex-col pb-1">
        {label && (
          <label
            className={`text-sm 
            ${error && "text-feedback-error"} 
            ${disabled && "text-neutral-400"} 
            ${!disabled && !error && "text-slate-100"}
            
            transition-all pb-2`}
          >
            {label}
            {required && " *"}
          </label>
        )}
        {children}
      </div>

      <div
        className={`${
          error && "text-feedback-error"
        } place-self-end text-sm transition-all h-6`}
      >
        {error?.message}
      </div>
    </div>
  );
};
