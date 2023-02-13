import { Button, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { z, ZodError } from 'zod';

import { useRegisterMutation } from '@/generated/graphql';
import { AuthContainer } from '@/pages/Authentication/styles/styled';
import { FormField } from '@/shared/Form';
import { email, password, username } from '@/utilities/zod/zodTypes';

export const Register: React.FC = () => {
  const [register] = useRegisterMutation();
  const [error, setError] = useState(false);

  const loginSchema = z.object({
    username: username,
    email: email,
    password: password,
  });

  type formProps = z.infer<typeof loginSchema>;

  const initialValues: formProps = { email: '', password: '', username: '' };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          try {
            const username: string = values.username;
            const email: string = values.email;
            const password: string = values.password;

            loginSchema.parse(values);

            const response = await register({
              variables: {
                username,
                email,
                password,
              },
            });
            if (response) <Navigate to="/login" />;
            else setError(true);
          } catch (err: any) {
            if (err instanceof ZodError) {
              console.log('Zod Error');
              setError(true);
            }
            console.log(err);
            return err;
          }
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        <AuthContainer>
          <Typography variant="h4">Register</Typography>
          <Typography sx={{ alignSelf: 'flex-start', marginBottom: '-18px' }}>
            Email
          </Typography>
          <FormField id="email" name="email" type="email" placeholder="Email" />
          <Typography sx={{ alignSelf: 'flex-start', marginBottom: '-18px' }}>
            Username
          </Typography>
          <FormField id="username" name="username" type="text" placeholder="Username" />
          <Typography sx={{ alignSelf: 'flex-start', marginBottom: '-18px' }}>
            Password
          </Typography>
          <FormField
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
          {error && <Typography color="red">Unexpected error</Typography>}
          <Button
            sx={{ width: '272px', fontWeight: '700' }}
            type="submit"
            variant="contained"
          >
            Log in
          </Button>
          <Typography sx={{ marginTop: '-10px' }}>
            Already have an account? <Link to="/login">Log in</Link>
          </Typography>
        </AuthContainer>
      </Formik>
    </Container>
  );
};
