import LinkMui from '@mui/material/Link';

export const ErrorMessages = {
  REPEATED_EMAIL: 'That email has already been registered',
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  WRONG_CREDENTIALS: 'Email or password are incorrect',
  FIELDS_VALIDATION_ERROR: (
    <>
      Failed to validate one or many fields. Please contact $
      {
        <LinkMui href="https://github.com/BenaventeX24/" underline="hover">
          {' '}
          {'@BenaventeX24'}{' '}
        </LinkMui>
      }{' '}
      for further steps
    </>
  ),
  DEFAULT: (
    <>
      An unexpected error occurred! Please contact
      {
        <LinkMui href="https://github.com/BenaventeX24/" underline="hover">
          {' '}
          {'@BenaventeX24'}{' '}
        </LinkMui>
      }
      for further steps.
    </>
  ),
};
