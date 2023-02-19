import { Alert, Container } from '@mui/material';
import { ApolloError } from 'apollo-boost';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ZodError } from 'zod';

import { useRegisterMutation } from '@/generated/graphql';
import { initialValues, registerSchema } from '@/utils/registerUtils';

type RegisterFormProps = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<ApolloError | undefined>>;
  children: React.ReactNode;
};

const RegisterFormik: React.FC<RegisterFormProps> = ({
  children,
  setLoading,
  setError,
}: RegisterFormProps) => {
  const [register, { loading, error }] = useRegisterMutation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(loading);
    setError(error);
  }, [loading, error]);

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100px',
      }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          try {
            const name = values.name as string,
              surname = values.surname as string,
              email = values.email as string,
              password = values.password as string,
              passwordConfirmation = values.passwordConfirmation as string;

            if (password !== passwordConfirmation)
              throw new Error('Passwords do not match');

            registerSchema.parse(values);
            console.log(values);

            const response = await register({
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
              throw new Error('Error while validating fields ' + err);
            }
            setError(error);
            console.log(error?.message);
          }
          actions.setSubmitting(false);
        }}
      >
        {children}
      </Formik>
    </Container>
  );
};

export default RegisterFormik;
