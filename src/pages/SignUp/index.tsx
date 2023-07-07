import React from 'react';
import { Background } from '../../components/atoms/Background';
import { Modal } from '../../components/atoms/Modal';
import { Title } from '../../components/atoms/Title';
import { TextInput } from '../../components/molecules/TextInput';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useInnerForm } from '../../hooks/useInnerForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckInput } from '../../components/molecules/CheckInput';
import { Button } from '../../components/atoms/Button';
import { FormInput } from '../../components/atoms/FormInput';

export type TCreateAccountForm = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  acceptTerms: boolean;
};

export const SignUp = () => {
  const schema = yup.object({
    name: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .test('passwords_match', 'Passwords must match', function (value) {
        return this.parent.password === value;
      }),
    country: yup.string().required(),
    acceptTerms: yup.boolean().required(),
  });

  const {
    innerRegister,
    handleSubmit,
    formState: { errors },
  } = useInnerForm({
    resolver: yupResolver(schema),
  });

  const submit = (data: TCreateAccountForm) => {};

  return (
    <div className="absolute h-full w-full top-0 left-0">
      <Background src="/background.jpg" />
      <Modal className="w-3/4 max-w-6xl">
        <form
          onSubmit={handleSubmit((data) => submit(data as TCreateAccountForm))}
          className="px-12 py-12 w-full flex flex-col">
          <Title>Sign up</Title>
          <div className="grid grid-cols-2 gap-2">
            <TextInput {...innerRegister('name')} placeholder="name" error={errors?.name} required label="Name" />
            <TextInput
              {...innerRegister('lastName')}
              placeholder="last name"
              error={errors?.lastName}
              required
              label="Last name"
            />
          </div>
          <TextInput {...innerRegister('email')} placeholder="email" error={errors?.email} required label="Email" />
          <FormInput error={errors?.passwords_match}>
            <TextInput
              {...innerRegister('password')}
              placeholder="password"
              type="password"
              error={errors?.password}
              required
              label="Password"
            />
            <TextInput
              {...innerRegister('confirmPassword')}
              placeholder="confirm password"
              type="password"
              error={errors?.confirmPassword}
              required
              label="Confirm password"
            />
          </FormInput>

          <TextInput
            {...innerRegister('country')}
            placeholder="country"
            error={errors?.country}
            required
            label="Country"
          />
          <CheckInput {...innerRegister('acceptTerms')} placeholder="accept terms" error={errors?.acceptTerms} required>
            Accept terms
          </CheckInput>

          <Button type="submit">Create account</Button>
        </form>
      </Modal>
    </div>
  );
};
