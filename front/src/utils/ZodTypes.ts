import { z } from 'zod';

export const authName = z
  .string()
  .min(2, 'Must be at least 2 characters in length')
  .max(16, 'Must not exceed 16 characters in length')
  .regex(
    new RegExp('^[A-Z ][a-zA-Z ]{1,22}$'),
    'First letter must be upercase and no special characters',
  );
export const authSurname = z
  .string()
  .min(2, 'Must be at least 2 characters in length')
  .max(22, 'Must not exceed 22 characters in length')
  .regex(
    new RegExp('^[A-Z][a-zA-Z ]{1,22}$'),
    'First letter must be upercase and no special characters',
  );
export const authEmail = z.string().email('Email must contain @ and domain extension');
export const authPassword = z
  .string()
  .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
  .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
  .regex(new RegExp('.*\\d.*'), 'One number')
  .regex(
    new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
    'One special character',
  )
  .min(8, 'Must be at least 8 characters in length');
