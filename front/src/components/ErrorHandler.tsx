import { Alert } from '@mui/material';
import { ApolloError } from 'apollo-boost';
import React from 'react';

import { ErrorMessages } from '@/utils/ErrorMessages';

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
      return <Alert severity="error">{ErrorMessages.REPEATED_EMAIL}</Alert>;
    case 'PASSWORDS_DONT_MATCH':
      return <Alert severity="warning">{ErrorMessages.PASSWORDS_DONT_MATCH}</Alert>;
    case 'WRONG_CREDENTIALS':
      return <Alert severity="error">{ErrorMessages.WRONG_CREDENTIALS}</Alert>;
    case 'FIELDS_VALIDATION_ERROR':
      return <Alert severity="error">{ErrorMessages.FIELDS_VALIDATION_ERROR}</Alert>;

    default:
      return <Alert severity="error">{ErrorMessages.DEFAULT}</Alert>;
  }
};
