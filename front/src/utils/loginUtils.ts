import { z, ZodError } from 'zod';

import { useLoginMutation } from '@/generated/graphql';

import { authEmail, authPassword } from './zodTypes';

export const loginSchema = z.object({
  email: authEmail,
  password: authPassword,
});

export const initialValues = { email: '', password: '' };

export const handleOnSubmit = async (values: typeof initialValues) => {
  const [login, { loading }] = useLoginMutation();

  try {
    const email = values.email as string,
      password = values.password as string;

    loginSchema.parse(initialValues);

    const response = await login({
      variables: {
        email,
        password,
      },
    });
    if (loading) return loading;

    if (response) throw new Error();
  } catch (err: any) {
    if (err instanceof ZodError) {
      return new Error('Error while validating fields ' + err);
    }
    return err;
  }
};
