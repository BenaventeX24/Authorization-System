import { Container } from '@mui/material';
import { Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ZodError } from 'zod';

import { tokenActions } from '@/redux/reducers/tokenReducer';
import store from '@/redux/redux';
import { initialValues } from '@/utils/loginUtils';

type LoginFormProps = {
  loginHook: any;
  children: React.ReactNode;
};

const RegisterFormik: React.FC<LoginFormProps> = ({
  loginHook,
  children,
}: LoginFormProps) => {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100px',
      }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          try {
            const email = values.email as string,
              password = values.password as string;

            const response = await loginHook({
              variables: {
                email,
                password,
              },
            });

            if (response.data?.login) {
              store.dispatch(tokenActions.setToken(response.data?.login));

              navigate('/');
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
    </Container>
  );
};

export default RegisterFormik;
