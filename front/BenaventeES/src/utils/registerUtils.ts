import { z, ZodError } from 'zod';

import { useRegisterMutation } from '@/generated/graphql';

import { authEmail, authName, authPassword, authSurname } from './zodTypes';

export const registerSchema = z.object({
  name: authName,
  surname: authSurname,
  email: authEmail,
  password: authPassword,
});

export const initialValues = {
  email: '',
  password: '',
  passwordConfirmation: '',
  name: '',
  surname: '',
};

export const handleOnSubmit = async (values: typeof initialValues) => {
  const [register] = useRegisterMutation();

  try {
    const name = values.name as string,
      surname = values.surname as string,
      email = values.email as string,
      password = values.password as string,
      passwordConfirmation = values.passwordConfirmation as string;

    if (password !== passwordConfirmation) throw new Error('Passwords do not match');

    registerSchema.parse(initialValues);

    const response = await register({
      variables: {
        email,
        name,
        surname,
        password,
      },
    });
    if (response) throw new Error();
  } catch (err: any) {
    if (err instanceof ZodError) {
      return new Error('Error while validating fields ' + err);
    }
    return err;
  }
};
