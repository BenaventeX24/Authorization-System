import { Button, CircularProgress, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Field, Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import { z, ZodError } from 'zod';

import { setAccessToken, setAuthentication } from '@/accessToken';
import { useLoginMutation } from '@/generated/graphql';
import { AuthContainer } from '@/pages/Authentication/styles/styled';
import { authEmail, authPassword } from '@/utilities/zod/zodTypes';

export const Login: React.FC = () => {
  const [login, { loading }] = useLoginMutation();

  const loginSchema = z.object({
    email: authEmail,
    password: authPassword,
  });

  type formProps = z.infer<typeof loginSchema>;

  const initialValues: formProps = { email: '', password: '' };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          try {
            const email: string = values.email;
            const password: string = values.password;

            loginSchema.parse(values);

            const response = await login({
              variables: {
                email,
                password,
              },
            });

            if (loading) return <CircularProgress />;

            if (response && response.data) {
              setAccessToken(response.data?.login.accessToken);
              setAuthentication(true);
            }
          } catch (error: any) {
            if (error instanceof ZodError) {
              console.log('ZodError');
            }
            console.log(error);
            return error;
          }
          actions.setSubmitting(false);
        }}
      >
        <AuthContainer>
          <Typography variant="h4">Log in</Typography>
          <Typography sx={{ alignSelf: 'flex-start', marginBottom: '-15px' }}>
            Email
          </Typography>
          <Field id="email" name="email" type="email" placeholder="Email" />
          <Typography sx={{ alignSelf: 'flex-start', marginBottom: '-15px' }}>
            Password
          </Typography>
          <Field id="password" name="password" type="password" placeholder="Password" />
          <Button
            sx={{ width: '272px', fontWeight: '700' }}
            type="submit"
            variant="contained"
          >
            Log in
          </Button>
          <Typography sx={{ marginTop: '-10px' }}>
            First time? <Link to="/Register">Register here</Link>
          </Typography>
          {loading && <CircularProgress />}
        </AuthContainer>
      </Formik>
    </Container>
  );
};
