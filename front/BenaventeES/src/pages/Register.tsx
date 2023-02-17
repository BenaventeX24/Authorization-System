import { Formik } from 'formik';
import React from 'react';

import AuthContainer from '@/components/AuthContainer';
import { RegisterFields } from '@/components/Register/RegisterFields';
import { handleOnSubmit, initialValues } from '@/utils/registerUtils';

export const Register: React.FC = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        await handleOnSubmit(values);
        actions.setSubmitting(false);
      }}
    >
      <AuthContainer title="Register">
        <RegisterFields />
      </AuthContainer>
    </Formik>
  );
};
