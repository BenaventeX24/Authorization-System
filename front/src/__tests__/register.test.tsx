import '@testing-library/jest-dom';
import '@testing-library/react/dont-cleanup-after-each';

import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/react-hooks';
import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { Register } from '@/pages/Register';
import store from '@/redux/store';
import { registerFields } from '@/utils/registerUtils';

const LOGIN = gql`
  mutation Register(
    $surname: String!
    $name: String!
    $password: String!
    $email: String!
  ) {
    register(surname: $surname, name: $name, password: $password, email: $email) {
      accessToken
    }
  }
`;

const mocks = [
  {
    request: {
      query: LOGIN,
      variables: {
        email: 'email',
        password: 'password',
      },
    },
    result: {
      data: {
        register: { accessToken: 'token', username: 'username', name: 'name' },
      },
    },
  },
];

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

      await fireEvent.change(input, { target: { value: data } });
    });

    await waitFor(() => {
      registerFields.forEach(async (field) => {
        const input = wrapper.container.querySelector(
          `input[name="${field.name}"]`,
        ) as Element;

        expect(input).toHaveValue(mockedData[`${field.name}`]);
      });
    });

    //fireEvent.click(wrapper.queryByTestId('send-btn') as Element);
  });

  //it('should render a label element with the given text', () => {});
  //it('should render a custom password field', () => {});*/
});
//<BrowserRouter>
//<Provider store={store}>
//<MockedProvider mocks={mocks} addTypename={false}>
