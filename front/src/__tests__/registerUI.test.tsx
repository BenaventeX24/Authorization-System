import '@testing-library/jest-dom';
import '@testing-library/react/dont-cleanup-after-each';

import { MockedProvider } from '@apollo/client/testing';
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
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
    const input = rendered.container.querySelector(`input[name="email"]`) as Element;

    fireEvent.focusIn(input);

    await waitFor(() => {
      expect(rendered.getByTestId('validation-popover')).toBeInTheDocument();
    });

    fireEvent.focusOut(input);

    await waitForElementToBeRemoved(() => rendered.getByTestId('validation-popover'));

    /*let validationTest: ZodError<any> = new ZodError([]);
    try {
      registerFields[0]?.validation?.parse('');
    } catch (err: any) {
      validationTest = err;
    }*/
    /* await waitFor(() => {
      expect(rendered.getByTestId('validation-popover')).not.toBeInTheDocument();

      /*expect(rendered.getByTestId('validation-popover')).toHaveTextContent(
        validationTest.issues[0].message,
      );*/
    //});
  });
});
