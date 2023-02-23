import { Alert } from '@mui/material';
import LinkMui from '@mui/material/Link';
import { ApolloError } from 'apollo-boost';
import React from 'react';

type ErrorHandlerProps = {
  error: ApolloError | Error | undefined;
};

export const ErrorHandler: React.FC<ErrorHandlerProps> = ({
  error,
}: ErrorHandlerProps) => {
  console.log(error);
  if (error === undefined || error.message === undefined) return <></>;
  switch (error.message) {
    case 'REPEATED_EMAIL':
      return <Alert severity="error">That email has already been registered</Alert>;
    case 'PASSWORDS_DONT_MATCH':
      return <Alert severity="error">Passwords do not match</Alert>;
    case 'WRONG_CREDENTIALS':
      return <Alert severity="error">Email or password are incorrect</Alert>;
    default:
      return (
        <>
          <Alert severity="error">
            An unexpected error occurred! please contact{' '}
            <LinkMui href="https://github.com/BenaventeX24/" underline="hover">
              {'@BenaventeX24'}
            </LinkMui>{' '}
            for more details.
          </Alert>
        </>
      );
  }
};
