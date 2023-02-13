import { z } from 'zod';

export const username = z
  .string()
  .min(8, 'Min of 8 characters required for username')
  .max(16, 'Max of 16 allowed characters for username')
  .regex(
    new RegExp('^[a-zA-Z0-9]{4,10}$'),
    'Not special characters allowed for username',
  );
export const email = z.string().email();
export const password = z
  .string()
  .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
  .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
  .regex(new RegExp('.*\\d.*'), 'One number')
  .regex(
    new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
    'One special character',
  )
  .min(8, 'Must be at least 8 characters in length');
