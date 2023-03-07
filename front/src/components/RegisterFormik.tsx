import { ApolloError } from 'apollo-client';
import { Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ZodError } from 'zod';

import { RegisterMutationResult } from '@/generated/graphql';
import { tokenActions } from '@/redux/reducers/tokenReducer';
import store from '@/redux/store';
import { initialValues, registerSchema } from '@/utils/registerUtils';

type RegisterFormProps = {
  registerHook: any;
  setError: React.Dispatch<React.SetStateAction<Error | ApolloError | undefined>>;
  children: React.ReactNode;
};

const RegisterFormik: React.FC<RegisterFormProps> = ({
  registerHook,
  setError,
  children,
}: RegisterFormProps) => {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        try {
          const name = values.name as string,
            surname = values.surname as string,
            email = values.email as string,
            password = values.password as string,
            passwordConfirmation = values.passwordConfirmation as string;

          if (password !== passwordConfirmation) throw new Error('PASSWORDS_DONT_MATCH');

          registerSchema.parse(values);

          const response: RegisterMutationResult = await registerHook({
            variables: {
              email,
              name,
              surname,
              password,
            },
          });

          if (response.data) {
            localStorage.setItem(
              'userdata',
              JSON.stringify({
                name: response.data.register.username,
                surname: response.data.register.usersurname,
              }),
            );

            store.dispatch(tokenActions.setToken(response.data.register.accessToken));

            navigate('/');
          } else throw new Error('SOMETHING_WENT_WRONG');
        } catch (err: any) {
          if (err instanceof ZodError) {
            setError(err);
          } else if (err instanceof Error) {
            setError(err);
          } else setError(new Error('SOMETHING_WENT_WRONG'));
        }
        actions.setSubmitting(false);
      }}
    >
      {children}
    </Formik>
  );
};

export default RegisterFormik;
