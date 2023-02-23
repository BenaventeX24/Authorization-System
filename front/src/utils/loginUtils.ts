import { z } from 'zod';

import { fields } from '@/utils/registerUtils';

import { authEmail, authPassword } from './zodTypes';

export const loginSchema = z.object({
  email: authEmail,
  password: authPassword,
});

export const initialValues = {
  email: '',
  password: '',
};

export const loginFields: Array<fields> = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    label: 'Email',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    label: 'Password',
  },
];
