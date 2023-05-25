import { useForm } from "react-hook-form";

export type TUseInnerParameters = Parameters<typeof useForm>;
export type TInnerRegisterParameters = Parameters<
  ReturnType<typeof useForm>["register"]
>;
export type TUseInnerFormReturn = ReturnType<typeof useForm> & {
  innerRegister: (...params: TInnerRegisterParameters) => TInnerRegisterReturn;
};
export type TInnerRegisterReturn = Omit<
  ReturnType<ReturnType<typeof useForm>["register"]>,
  "ref"
> & { innerRef: ReturnType<ReturnType<typeof useForm>["register"]>["ref"] };

export const useInnerForm = (
  ...parameters: TUseInnerParameters
): TUseInnerFormReturn => {
  const form = useForm(...parameters);

  const innerRegister = (
    ...params: TInnerRegisterParameters
  ): TInnerRegisterReturn => {
    const registerInfo = form.register(...params);

    const { ref, ...rest } = registerInfo;
    return { ...rest, innerRef: ref };
  };

  return { ...form, innerRegister };
};
