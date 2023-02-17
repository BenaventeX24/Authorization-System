import { Button, CircularProgress, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Field, Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import { z, ZodError } from 'zod';

import { setAccessToken, setAuthentication } from '@/accessToken';
import { useLoginMutation } from '@/generated/graphql';
import { authEmail, authPassword } from '@/utils/zodTypes';

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
    ></Container>
  );
};
