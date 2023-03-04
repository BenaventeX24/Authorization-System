import '@testing-library/jest-dom';
import '@testing-library/react/dont-cleanup-after-each';

import { MockedProvider } from '@apollo/client/testing';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { mockedUseRegisterMutation } from '@/__tests__/__mocks__/mockedApolloHooks';
import { mockLocalStorage } from '@/__tests__/__mocks__/mockedLocalStorage';
import { RegisterDocument } from '@/generated/graphql';
import { Register } from '@/pages/Register';
import store from '@/redux/store';
import { registerFields } from '@/utils/registerUtils';

import { mockedUseNavigate } from './__mocks__/mockedReactRouterDom';
const { setItemMock } = mockLocalStorage();

const mocks = [
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
      fireEvent.change(input, { target: { value: mockedData[`${field.name}`] } });
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
      expect(mockedUseRegisterMutation).toHaveBeenCalled();
      expect(setItemMock).toHaveBeenCalled();
      expect(mockedUseNavigate).toHaveBeenCalled();
    });
  });
});
