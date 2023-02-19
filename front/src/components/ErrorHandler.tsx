import { Alert } from '@mui/material';
import LinkMui from '@mui/material/Link';
import { ApolloError } from 'apollo-boost';
import React from 'react';

type ErrorHandlerProps = {
  error: ApolloError | undefined;
};

export const ErrorHandler: React.FC<ErrorHandlerProps> = ({
  error,
}: ErrorHandlerProps) => {
  if (error === undefined) return <></>;
  switch (error.message) {
    case 'REPEATED_EMAIL':
      return <Alert severity="error">That email has already been registered</Alert>;
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
