import { Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ZodError } from 'zod';

import { initialValues, registerSchema } from '@/utils/registerUtils';

type RegisterFormProps = {
  registerHook: any;
  children: React.ReactNode;
};

const RegisterFormik: React.FC<RegisterFormProps> = ({
  registerHook,
  children,
}: RegisterFormProps) => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        try {
          const name = values.name as string,
            surname = values.surname as string,
            email = values.email as string,
            password = values.password as string,
            passwordConfirmation = values.passwordConfirmation as string;

          if (password !== passwordConfirmation) throw new Error('PASSWORDS_DONT_MATCH');

          registerSchema.parse(values);

          const response = await registerHook({
            variables: {
              email,
              name,
              surname,
              password,
            },
          });
          if (response.data?.register) navigate('/login');
        } catch (err: any) {
          if (err instanceof ZodError) {
            throw new Error('FIELDS_VALIDATION_ERROR');
          }
        }
        actions.setSubmitting(false);
      }}
    >
      {children}
    </Formik>
  );
};

export default RegisterFormik;
