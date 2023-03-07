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
  if (error === undefined || error.message === undefined) return <></>;
  switch (error.message) {
    case 'REPEATED_EMAIL':
      return <Alert severity="error">That email has already been registered</Alert>;
    case 'PASSWORDS_DONT_MATCH':
      return <Alert severity="warning">Passwords do not match</Alert>;
    case 'WRONG_CREDENTIALS':
      return <Alert severity="error">Email or password are incorrect</Alert>;
    case 'FIELDS_VALIDATION_ERROR':
      return (
        <Alert severity="error">
          Failed to validate one or many fields. Please contact{' '}
          <LinkMui href="https://github.com/BenaventeX24/" underline="hover">
            {'@BenaventeX24'}
          </LinkMui>{' '}
          for further steps
        </Alert>
      );

    default:
      return (
        <>
          <Alert severity="error">
            An unexpected error occurred! Please contact{' '}
            <LinkMui href="https://github.com/BenaventeX24/" underline="hover">
              {'@BenaventeX24'}
            </LinkMui>{' '}
            for further steps.
          </Alert>
        </>
      );
  }
};
