import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { Form } from 'formik';
import { ReactNode } from 'react';

export const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid gray;
  padding: 34px;
  width: '100px';
`;

type AuthContainerProps = {
  title: string;
  children: ReactNode;
};

const AuthForm: React.FC<AuthContainerProps> = ({
  title,
  children,
}: AuthContainerProps) => {
  return (
    <>
      <FormContainer>
        <Typography variant="h4">{title}</Typography>
        {children}
      </FormContainer>
    </>
  );
};

export default AuthForm;
