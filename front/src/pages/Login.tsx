import { CircularProgress, Container, Typography } from '@mui/material';
import { ApolloError } from 'apollo-client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import AuthForm from '@/components/AuthForm';
import FormField from '@/components/AuthFormField';
import { ErrorHandler } from '@/components/ErrorHandler';
import LoginFormik from '@/components/LoginFormik';
import Navbar from '@/components/Navbar';
import SendButton from '@/components/SendButton';
import { useLoginMutation } from '@/generated/graphql';
import { initialValues, loginFields } from '@/utils/LoginUtils';

const Login: React.FC = () => {
  const [login, { loading, error }] = useLoginMutation();
  const [errorState, setError] = useState<Error | ApolloError | undefined>(error);

  return (
    <>
      <Navbar />
      <Container
        disableGutters
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          marginTop: '51px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100px',
        }}
      >
        <LoginFormik loginHook={login} setError={setError}>
          <AuthForm title="Log in">
            {loginFields.map((field) => {
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
            <SendButton initialValues={initialValues}>Log in</SendButton>
            <Typography>
              First time around? <Link to="/register">Create an account</Link>
            </Typography>
          </AuthForm>
        </LoginFormik>
      </Container>
    </>
  );
};

export default Login;
