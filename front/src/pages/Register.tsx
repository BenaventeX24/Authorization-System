import { CircularProgress, Container, Typography } from '@mui/material';
import { ApolloError } from 'apollo-client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import AuthForm from '@/components/AuthForm';
import FormField from '@/components/AuthFormField';
import { ErrorHandler } from '@/components/ErrorHandler';
import Navbar from '@/components/Navbar';
import RegisterFormik from '@/components/RegisterFormik';
import SendButton from '@/components/SendButton';
import { useRegisterMutation } from '@/generated/graphql';
import { initialValues, registerFields, registerSchema } from '@/utils/RegisterUtils';

export const Register: React.FC = () => {
  const [register, { loading, error }] = useRegisterMutation();
  const [errorState, setError] = useState<Error | ApolloError | undefined>(error);

  return (
    <>
      <Navbar />

      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '40px',
        }}
      >
        <RegisterFormik registerHook={register} setError={setError}>
          <AuthForm title="Register">
            {registerFields.map((field) => {
              return (
                <FormField
                  key={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  label={field.label}
                  validation={field.validation}
                />
              );
            })}
            {loading && <CircularProgress />}
            {errorState && <ErrorHandler error={errorState} />}
            <SendButton initialValues={initialValues} schema={registerSchema}>
              Register
            </SendButton>
            <Typography>
              Already have an account? <Link to="/login">Log in</Link>
            </Typography>
          </AuthForm>
        </RegisterFormik>
      </Container>
    </>
  );
};
