import { Alert, CircularProgress, Typography } from '@mui/material';
import LinkMui from '@mui/material/Link';
import { ApolloError } from 'apollo-boost';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import AuthForm from '@/components/AuthForm';
import { ErrorHandler } from '@/components/ErrorHandler';
import FormField from '@/components/FormField';
import RegisterFormik from '@/components/RegisterFormik';
import SendButton from '@/components/SendButton';
import { initialValues, registerFields, registerSchema } from '@/utils/registerUtils';

export const Register: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApolloError | undefined>();

  return (
    <RegisterFormik setLoading={setLoading} setError={setError}>
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
        <SendButton initialValues={initialValues} schema={registerSchema} />
        <Typography sx={{ marginTop: '-10px' }}>
          Already have an account? <Link to="/login">Log in</Link>
        </Typography>
      </AuthForm>
    </RegisterFormik>
  );
};
