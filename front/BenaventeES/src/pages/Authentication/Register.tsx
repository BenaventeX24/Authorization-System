import { Button, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { z, ZodError } from 'zod';

import { useRegisterMutation } from '@/generated/graphql';
import { AuthContainer } from '@/pages/Authentication/styles/styled';
import FormField from '@/shared/FormField';
import { authEmail, authName, authPassword, authSurname } from '@/utilities/zod/zodTypes';

export const registerSchema = z.object({
  name: authName,
  surname: authSurname,
  email: authEmail,
  password: authPassword,
});

export const Register: React.FC = () => {
  const [register] = useRegisterMutation();

  const initialValues: formProps = { email: '', password: '', name: '', surname: '' };
  const [validation, setValidation] = useState<ZodError<any>>();
  type formProps = z.infer<typeof registerSchema>;

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
            const name = values.name as string;
            const surname = values.surname as string;
            const email = values.email as string;
            const password = values.password as string;

            registerSchema.parse(initialValues);

            const response = await register({
              variables: {
                email,
                name,
                surname,
                password,
              },
            });
            if (response) <Navigate to="/login" />;
          } catch (err: any) {
            if (err instanceof ZodError) {
              setValidation(err);
            }
            console.log(err);
            return err;
          }
          actions.setSubmitting(false);
        }}
      >
        <AuthContainer>
          <Typography variant="h4">Register</Typography>
          <FormField
            name="email"
            type="email"
            placeholder="Email"
            validation={authEmail}
            label="Email"
          />
          <FormField
            name="password"
            type="Password"
            placeholder="Password"
            validation={authPassword}
            label="Password"
          />
          <FormField
            name="passwordConfirmation"
            type="Password"
            placeholder="Password Confirmation"
            validation={authPassword}
            label="Password Confirmation"
          />
          <FormField
            name="name"
            type="text"
            placeholder="Name"
            validation={authName}
            label="Name"
          />
          <FormField
            name="surname"
            type="text"
            placeholder="Surname"
            validation={authSurname}
            label="Surname"
          />
          {validation && (
            <Typography color="red">Please fix validation issues</Typography>
          )}
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
