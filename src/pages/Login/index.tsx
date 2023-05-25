import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import * as yup from "yup";
import { Button } from "../../components/atoms/Button";
import { CheckInput } from "../../components/molecules/CheckInput";
import { TextInput } from "../../components/molecules/TextInput";
import { useInnerForm } from "../../hooks/useInnerForm";
import { Link } from "../../components/atoms/Link";
import { useAuth } from "../../contexts/Auth";
import { useNavigate } from "react-router";
import { Background } from "../../components/atoms/Background";
import { Modal } from "../../components/atoms/Modal";
import { Title } from "../../components/atoms/Title";

export type TLoginProps = {};

export type TLoginForm = {
  username: string;
  password: string;
  remember: boolean;
};

const schema = yup.object({
  username: yup.string(),
  password: yup.string(),
  remember: yup.boolean(),
});

export const Login: React.FC<TLoginProps> = ({}) => {
  const {
    handleSubmit,
    formState: { errors },
    innerRegister,
  } = useInnerForm({
    resolver: yupResolver(schema),
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = (a: TLoginForm) => {
    login();

    navigate("/");
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full ">
      <Background src="/background.jpg" />
      <Modal className="w-1/2 max-w-lg">
        <form
          onSubmit={handleSubmit((data) => submit(data as TLoginForm))}
          className="px-12 py-6 w-full flex flex-col"
        >
          <Title>Login</Title>

          <div className="grid grid-cols-1 h-min gap-1 pb-12">
            <TextInput
              {...innerRegister("username")}
              error={errors?.username}
              label="Username"
              required
              placeholder="Username"
              // disabled
            />
            <TextInput
              {...innerRegister("password")}
              error={errors?.password}
              type="password"
              label="Password"
              required
              // disabled
            />
            <CheckInput
              {...innerRegister("remember")}
              error={errors?.test}
              // disabled
            >
              Remember me
            </CheckInput>
          </div>
          <div className="w-full grid grid-cols-1 h-min gap-2 pb-12">
            <Button type="submit" className="mt-8">
              LOGIN
            </Button>
            <p className="text-slate-100">
              Don't have an account? Click <Link to={"/sign-up"}>here</Link> to
              sign up.
            </p>
          </div>
        </form>
      </Modal>
    </div>
  );
};
