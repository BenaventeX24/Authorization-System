import { ApolloError } from 'apollo-client';
import { Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { RegisterMutationResult } from '@/generated/graphql';
import { tokenActions } from '@/redux/reducers/TokenReducer';
import store from '@/redux/Store';
import { initialValues, registerSchema } from '@/utils/RegisterUtils';

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

            Promise.resolve(
              store.dispatch(tokenActions.setToken(response.data.register.accessToken)),
            ).then(() => {
              navigate('/');
            });
          } else throw new Error('SOMETHING_WENT_WRONG');
        } catch (err: any) {
          setError(err);
        }
        actions.setSubmitting(false);
      }}
    >
      {children}
    </Formik>
  );
};

export default RegisterFormik;
