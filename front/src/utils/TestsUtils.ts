import { LoginDocument, RegisterDocument } from '@/generated/graphql';

const loginRequest = {
  query: LoginDocument,
  variables: {
    email: 'email@email.com',
    password: 'Password123!',
  },
};

const registerRequest = {
  query: RegisterDocument,
  variables: {
    email: 'email@email.com',
    password: 'Password123!',
    name: 'Name',
    surname: 'Surname',
  },
};

export const registerMocks = [
  {
    request: { ...registerRequest },
    result: {
      data: {
        register: { accessToken: 'token', usersurname: 'usersurname', username: 'name' },
      },
    },
  },
];

export const loginMocks = [
  {
    request: { ...loginRequest },
    result: {
      data: {
        login: { accessToken: 'token', usersurname: 'usersurname', username: 'name' },
      },
    },
  },
];

export const mocksError = [
  {
    request: { ...registerRequest },
    error: new Error('REPEATED_EMAIL'),
  },
];

export const wrongCredentialsMock = [
  {
    request: { ...loginRequest },
    error: new Error('WRONG_CREDENTIALS'),
  },
];

type IMockedData = {
  [key: string]: string;
};

export const mockedData: IMockedData = {
  email: 'email@email.com',
  password: 'Password123!',
  passwordConfirmation: 'Password123!',
  name: 'Name',
  surname: 'Surname',
};
