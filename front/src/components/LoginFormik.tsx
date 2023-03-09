import { ApolloError } from 'apollo-client';
import { Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginMutationResult } from '@/generated/graphql';
import { tokenActions } from '@/redux/reducers/TokenReducer';
import store from '@/redux/Store';
import { initialValues } from '@/utils/LoginUtils';

type LoginFormProps = {
  loginHook: any;
  setError: React.Dispatch<React.SetStateAction<Error | ApolloError | undefined>>;
  children: React.ReactNode;
};

const RegisterFormik: React.FC<LoginFormProps> = ({
  loginHook,
  children,
  setError,
}: LoginFormProps) => {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        try {
          const email = values.email as string,
            password = values.password as string;

          const response: LoginMutationResult = await loginHook({
            variables: {
              email,
              password,
            },
          });

          if (response.data) {
            localStorage.setItem(
              'userdata',
              JSON.stringify({
                name: response.data.login.username,
                surname: response.data.login.usersurname,
              }),
            );

            store.dispatch(tokenActions.setToken(response.data.login.accessToken));

            navigate('/');
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
