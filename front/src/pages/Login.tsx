import { CircularProgress, Container, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import AuthForm from '@/components/AuthForm';
import FormField from '@/components/AuthFormField';
import { ErrorHandler } from '@/components/ErrorHandler';
import LoginFormik from '@/components/LoginFormik';
import Navbar from '@/components/Navbar';
import SendButton from '@/components/SendButton';
import { useLoginMutation } from '@/generated/graphql';
import { loginFields } from '@/utils/loginUtils';
import { initialValues } from '@/utils/loginUtils';

const Login: React.FC = () => {
  const [login, { loading, error }] = useLoginMutation();
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
        }}
      >
        <LoginFormik loginHook={login}>
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
            <ErrorHandler error={error} />
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
