import styled from '@emotion/styled';
import { Container, Typography } from '@mui/material';
import { Form } from 'formik';
import { ReactNode } from 'react';

export const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid gray;
  padding: 34px;
`;

type AuthContainerProps = {
  title: string;
  children: ReactNode;
};

const AuthContainer: React.FC<AuthContainerProps> = ({
  title,
  children,
}: AuthContainerProps) => {
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FormContainer>
          <Typography variant="h4">{title}</Typography>
          {children}
        </FormContainer>
      </Container>
    </>
  );
};

export default AuthContainer;
