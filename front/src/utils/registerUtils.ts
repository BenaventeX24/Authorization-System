import { z } from 'zod';

import { authEmail, authName, authPassword, authSurname } from './zodTypes';

export const registerSchema = z.object({
  email: authEmail,
  name: authName,
  surname: authSurname,
  password: authPassword,
});

export const initialValues = {
  email: '',
  password: '',
  passwordConfirmation: '',
  name: '',
  surname: '',
};

export type fields = {
  name: string;
  type: string;
  placeholder: string;
  validation: any;
  label: string;
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
];
