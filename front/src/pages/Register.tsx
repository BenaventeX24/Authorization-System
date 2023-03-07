import { CircularProgress, Container, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import AuthForm from '@/components/AuthForm';
import FormField from '@/components/AuthFormField';
import { ErrorHandler } from '@/components/ErrorHandler';
import Navbar from '@/components/Navbar';
import RegisterFormik from '@/components/RegisterFormik';
import SendButton from '@/components/SendButton';
import { useRegisterMutation } from '@/generated/graphql';
import { initialValues, registerFields, registerSchema } from '@/utils/registerUtils';

export const Register: React.FC = () => {
  const [register, { loading, error }] = useRegisterMutation();

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
        <RegisterFormik registerHook={register}>
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
            <ErrorHandler error={error} />
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
