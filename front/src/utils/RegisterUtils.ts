import { z } from 'zod';

import { TermsAndConditionsLabel } from './LinkToTermsAndConditions';
import {
  authEmail,
  authName,
  authPassword,
  authSurname,
  TermsAndConditions,
} from './ZodTypes';

export const registerSchema = z.object({
  email: authEmail,
  name: authName,
  surname: authSurname,
  password: authPassword,
  termsAndConditions: TermsAndConditions,
});

export const initialValues = {
  email: '',
  password: '',
  passwordConfirmation: '',
  name: '',
  surname: '',
  termsAndConditions: false,
};

export type fields = {
  name: string;
  type: string;
  placeholder: string;
  validation?: z.TypeOf<any>;
  label: string | JSX.Element;
};

export const registerFields: Array<fields> = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    validation: authEmail,
    label: 'Email',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    validation: authPassword,
    label: 'Password',
  },
  {
    name: 'passwordConfirmation',
    type: 'password',
    placeholder: 'Password confirmation',
    validation: authPassword,
    label: 'Password confirmation',
  },
  {
    name: 'name',
    type: 'text',
    placeholder: 'Name',
    validation: authName,
    label: 'Name',
  },
  {
    name: 'surname',
    type: 'text',
    placeholder: 'Surname',
    validation: authSurname,
    label: 'Surname',
  },
  {
    name: 'termsAndConditions',
    type: 'checkbox',
    placeholder: '',
    validation: TermsAndConditions,
    label: TermsAndConditionsLabel,
  },
];
