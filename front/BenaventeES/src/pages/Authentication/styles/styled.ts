import styled from '@emotion/styled';
import { Form } from 'formik';

export const AuthContainer = styled(Form)`
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;

  /* Neutral/White */

  background: #ffffff;
  border-radius: 8px;

  border: 1px solid gray;
  padding: 34px;
`;
