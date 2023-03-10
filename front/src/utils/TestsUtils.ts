import { LoginDocument, RegisterDocument } from '@/generated/graphql';

export const registerMocks = [
  {
    request: {
      query: RegisterDocument,
      variables: {
        email: 'email@email.com',
        password: 'Password123!',
        name: 'Name',
        surname: 'Surname',
      },
    },
    result: {
      data: {
        register: { accessToken: 'token', usersurname: 'usersurname', username: 'name' },
      },
    },
  },
];

export const loginMocks = [
  {
    request: {
      query: LoginDocument,
      variables: {
        email: 'email@email.com',
        password: 'Password123!',
      },
    },
    result: {
      data: {
        login: { accessToken: 'token', usersurname: 'usersurname', username: 'name' },
      },
    },
  },
];

export const mocksError = [
  {
    request: {
      query: RegisterDocument,
      variables: {
        email: 'email@email.com',
        password: 'Password123!',
        name: 'Name',
        surname: 'Surname',
      },
    },

    error: new Error('REPEATED_EMAIL'),
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
