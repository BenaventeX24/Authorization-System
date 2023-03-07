import '@testing-library/jest-dom';
import '@testing-library/react/dont-cleanup-after-each';

import { MockedProvider } from '@apollo/client/testing';
import {
  cleanup,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ZodError } from 'zod';

import { RegisterDocument } from '@/generated/graphql';
import { Register } from '@/pages/Register';
import store from '@/redux/store';
import { registerFields } from '@/utils/registerUtils';

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

describe('Register form test', () => {
  afterAll(() => {
    cleanup();
  });

  const rendered = render(
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
        rendered.container.querySelector(`input[name="${field.name}"]`),
      ).toBeInTheDocument();
    });
    expect(rendered.queryByTestId('send-btn')).toBeInTheDocument();
    expect(rendered.queryByTestId('send-btn')).toBeDisabled();
  });

  it('should show a popover showing the user what input validation is missing', async () => {
    let popover: Element = document.body;
    registerFields.forEach(async (field) => {
      const input = rendered.container.querySelector(`input[name="${field.name}"]`);
      userEvent.click(input as Element);

      await waitFor(() => {
        popover = rendered.getByTestId('validation-popover');
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
        expect(rendered.getByTestId('validation-popover')).toHaveTextContent(
          issue.message,
        );
      });

      //The close popover in real UI is called by clicking anywhere in the page
      //as Popover generates this component using the hole window
      userEvent.click(popover);

      waitForElementToBeRemoved(() => popover);
    });
  });
});
