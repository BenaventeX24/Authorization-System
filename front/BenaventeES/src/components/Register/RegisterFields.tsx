import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import SendButton from '@/components/SendButton';
import FormField from '@/shared/FormField';
import { initialValues, registerSchema } from '@/utils/registerUtils';
import { authEmail, authName, authPassword, authSurname } from '@/utils/zodTypes';

export const RegisterFields: React.FC = () => {
  return (
    <>
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
        placeholder="Password confirmation"
        validation={authPassword}
        label="Password confirmation"
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
      <Typography sx={{ marginTop: '-10px' }}>
        Already have an account? <Link to="/login">Log in</Link>
      </Typography>
      <SendButton initialValues={initialValues} schema={registerSchema} />
    </>
  );
};
