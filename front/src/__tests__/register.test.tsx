import '@testing-library/jest-dom';
import '@testing-library/react/dont-cleanup-after-each';

import * as Apollo from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { MutationHookOptions } from '@apollo/react-hooks';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { ApolloClient } from 'apollo-boost';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { any } from 'zod';

import { mockLocalStorage } from '@/__tests__/__mocks__/mockLocalStorage';
import * as queries from '@/generated/graphql';
import {
  RegisterDocument,
  RegisterMutation,
  RegisterMutationVariables,
} from '@/generated/graphql';
import { Register } from '@/pages/Register';
import store from '@/redux/store';
import { registerFields } from '@/utils/registerUtils';
const { getItemMock, setItemMock } = mockLocalStorage();

const mocks = [
  {
    request: {
      query: RegisterDocument,
      variables: {
        email: 'email@email.com',
        password: 'Password123!',
        //passwordConfirmation: 'Password123!',
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

const mock = jest.fn();
const useRegisterMutationMock = jest.spyOn(queries, 'useRegisterMutation');
useRegisterMutationMock.mockImplementation(
  (
    baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>,
  ) => {
    const options = { ...{}, ...baseOptions };
    return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
      RegisterDocument,
      options,
    );
  },
);

describe('Custom form fields tests', () => {
  afterAll(() => {
    cleanup();
  });

  const wrapper = render(
    <BrowserRouter>
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Register />
        </MockedProvider>
      </Provider>
    </BrowserRouter>,
  );

  it('should render each component needed in register correctly', async () => {
    registerFields.forEach((field) => {
      expect(
        wrapper.container.querySelector(`input[name="${field.name}"]`),
      ).toBeInTheDocument();
    });
    expect(wrapper.queryByTestId('send-btn')).toBeInTheDocument();
    expect(wrapper.queryByTestId('send-btn')).toBeDisabled();
  });

  it('should fill the inputs and send data', async () => {
    type IMockedData = {
      [key: string]: string;
    };

    const mockedData: IMockedData = {
      email: 'email@email.com',
      password: 'Password123!',
      passwordConfirmation: 'Password123!',
      name: 'Name',
      surname: 'Surname',
    };

    registerFields.forEach(async (field) => {
      const input = wrapper.container.querySelector(
        `input[name="${field.name}"]`,
      ) as Element;
      let data = '';

      for (const key in mockedData) {
        if ((key as string) === 'email') data = mockedData[`${field.name}`];
      }

      fireEvent.change(input, { target: { value: data } });
    });

    await waitFor(() => {
      registerFields.forEach(async (field) => {
        const input = wrapper.container.querySelector(
          `input[name="${field.name}"]`,
        ) as Element;

        expect(input).toHaveValue(mockedData[`${field.name}`]);
        expect(wrapper.queryByTestId('send-btn')).not.toBeDisabled();
      });
    });

    fireEvent.click(wrapper.queryByTestId('send-btn') as Element);

    await waitFor(() => {
      expect(mock).toHaveBeenCalled();
      expect(queries.useRegisterMutation).toHaveBeenCalled();
      expect(setItemMock).toHaveBeenCalled();
    });
  });
  //it('should render a label element with the given text', () => {});
  //it('should render a custom password field', () => {});*/
});
//<BrowserRouter>
//<Provider store={store}>
//<MockedProvider mocks={mocks} addTypename={false}>
