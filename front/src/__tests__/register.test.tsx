import '@testing-library/jest-dom';

import { MockedProvider } from '@apollo/client/testing';
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ZodError } from 'zod';

import { mockedUseRegisterMutation } from '@/__tests__/__mocks__/mockedApolloHooks';
import { mockLocalStorage } from '@/__tests__/__mocks__/mockedLocalStorage';
import { RegisterDocument } from '@/generated/graphql';
import { Register } from '@/pages/Register';
import store from '@/redux/store';
import { registerFields } from '@/utils/registerUtils';

const { setItemMock } = mockLocalStorage();

export const mocks = [
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

describe('Register form test render and works just fine with the correct data being sent', () => {
  afterEach(() => {
    cleanup();
  });

  test('should render each component needed in register correctly', async () => {
    const view = render(
      <BrowserRouter>
        <Provider store={store}>
          <MockedProvider mocks={mocks} addTypename={false}>
            <Register />
          </MockedProvider>
        </Provider>
      </BrowserRouter>,
    );

    registerFields.forEach((field) => {
      expect(
        view.container.querySelector(`input[name="${field.name}"]`),
      ).toBeInTheDocument();
    });
    expect(view.queryByTestId('send-btn')).toBeInTheDocument();
    expect(view.queryByTestId('send-btn')).toBeDisabled();
  });

  test('should fill the inputs and send data', async () => {
    const view = render(
      <BrowserRouter>
        <Provider store={store}>
          <MockedProvider mocks={mocks} addTypename={false}>
            <Register />
          </MockedProvider>
        </Provider>
      </BrowserRouter>,
    );

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
      const input = view.container.querySelector(`input[name="${field.name}"]`);
      fireEvent.change(input as Element, {
        target: { value: mockedData[`${field.name}`] },
      });
    });

    await waitFor(() => {
      registerFields.forEach(async (field) => {
        const input = view.container.querySelector(
          `input[name="${field.name}"]`,
        ) as Element;

        expect(input).toHaveValue(mockedData[`${field.name}`]);
        expect(view.queryByTestId('send-btn')).not.toBeDisabled();
      });
    });

    fireEvent.click(view.queryByTestId('send-btn') as Element);

    await waitFor(() => {
      expect(mockedUseRegisterMutation).toHaveBeenCalled();
      expect(setItemMock).toHaveBeenCalled();
    });
  });

  test('should show a popover showing the user what input validation is missing', async () => {
    const view = render(
      <BrowserRouter>
        <Provider store={store}>
          <MockedProvider mocks={mocks} addTypename={false}>
            <Register />
          </MockedProvider>
        </Provider>
      </BrowserRouter>,
    );
    let popover: Element = document.body;
    registerFields.forEach(async (field) => {
      const input = view.container.querySelector(`input[name="${field.name}"]`);
      userEvent.click(input as Element);

      await waitFor(() => {
        popover = view.getByTestId('validation-popover');
      });

      //Get the validation errors by parsing with empty string
      let validationTest: ZodError<any> = new ZodError([]);
      try {
        field.validation.validation?.parse('');
      } catch (err: any) {
        validationTest = err;
      }

      //Test if validation errors are being shown in a popover
      validationTest.issues.forEach(async (issue) => {
        expect(view.getByTestId('validation-popover')).toHaveTextContent(issue.message);
      });

      //The close popover in real UI is called by clicking anywhere in the page
      //as Popover generates this component using the hole window
      userEvent.click(popover);

      waitForElementToBeRemoved(() => popover);
    });
  });
});
