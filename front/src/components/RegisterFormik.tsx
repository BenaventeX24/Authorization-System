import { Formik } from 'formik';
import React from 'react';
import { redirect } from 'react-router-dom';
import { ZodError } from 'zod';

import { RegisterMutationResult } from '@/generated/graphql';
import { tokenActions } from '@/redux/reducers/tokenReducer';
import store from '@/redux/store';
import { initialValues, registerSchema } from '@/utils/registerUtils';

type RegisterFormProps = {
  registerHook: any;
  children: React.ReactNode;
};

const RegisterFormik: React.FC<RegisterFormProps> = ({
  registerHook,
  children,
}: RegisterFormProps) => {
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

            redirect('/');
          } else throw new Error('SOMETHING_WENT_WRONG');
        } catch (err: any) {
          if (err instanceof ZodError) {
            throw new Error('FIELDS_VALIDATION_ERROR');
          }
        }
        actions.setSubmitting(false);
      }}
    >
      {children}
    </Formik>
  );
};

export default RegisterFormik;
