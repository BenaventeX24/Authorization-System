import { Button, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import { z, ZodError } from 'zod';

import { setAccessToken, setAuthentication } from '@/accessToken';
import { useLoginMutation } from '@/generated/graphql';
import { AuthContainer } from '@/pages/Authentication/styles/styled';
import { FormField } from '@/shared/Form';

export const Login: React.FC = () => {
  const [login] = useLoginMutation();

  const loginSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
      .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
      .regex(new RegExp('.*\\d.*'), 'One number')
      .regex(
        new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
        'One special character',
      )
      .min(8, 'Must be at least 8 characters in length'),
  });

  type formProps = z.infer<typeof loginSchema>;

  const initialValues: formProps = { email: '', password: '' };

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
            const email: string = values.email;
            const password: string = values.password;

            loginSchema.parse(values);

            const response = await login({
              variables: {
                email,
                password,
              },
            });
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
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        <AuthContainer>
          <Typography variant="h4">Log in</Typography>
          <Typography
            sx={{ alignSelf: 'flex-start', marginLeft: '16px', marginBottom: '-15px' }}
          >
            Email
          </Typography>
          <FormField id="email" name="email" type="email" placeholder="Email" />
          <Typography
            sx={{ alignSelf: 'flex-start', marginLeft: '16px', marginBottom: '-15px' }}
          >
            Password
          </Typography>
          <FormField
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
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
        </AuthContainer>
      </Formik>
    </Container>
  );
};
