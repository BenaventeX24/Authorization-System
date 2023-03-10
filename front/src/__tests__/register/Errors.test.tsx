import '@testing-library/jest-dom';

import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { Register } from '@/pages/Register';
import store from '@/redux/Store';
import { ErrorMessages } from '@/utils/ErrorMessages';
import { registerFields } from '@/utils/RegisterUtils';
import { mocksError, registerMocks } from '@/utils/TestsUtils';

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

test('after sending incorrect data it will show an alert component telling the user what the problem was', async () => {
  const view = render(
    <BrowserRouter>
      <Provider store={store}>
        <MockedProvider mocks={registerMocks} addTypename={false}>
          <Register />
        </MockedProvider>
      </Provider>
    </BrowserRouter>,
  );

  const mockedDataWithError = Object.assign({}, mockedData);
  mockedDataWithError['passwordConfirmation'] = 'DifferentPassword123!';

  registerFields.forEach(async (field) => {
    const input = view.container.querySelector(`input[name="${field.name}"]`);
    fireEvent.change(input as Element, {
      target: { value: mockedDataWithError[`${field.name}`] },
    });
  });

  fireEvent.click(view.queryByTestId('send-btn') as Element);

  await waitFor(() => {
    expect(view.getByText(ErrorMessages.PASSWORDS_DONT_MATCH)).toBeInTheDocument();
  });
});

test('after sending incorrect data it will show an alert component telling the user what the problem was', async () => {
  const view = render(
    <BrowserRouter>
      <Provider store={store}>
        <MockedProvider mocks={mocksError} addTypename={false}>
          <Register />
        </MockedProvider>
      </Provider>
    </BrowserRouter>,
  );

  registerFields.forEach(async (field) => {
    const input = view.container.querySelector(`input[name="${field.name}"]`);
    fireEvent.change(input as Element, {
      target: { value: mockedData[`${field.name}`] },
    });
  });

  fireEvent.click(view.queryByTestId('send-btn') as Element);

  await waitFor(() => {
    expect(view.getByText(ErrorMessages.REPEATED_EMAIL)).toBeInTheDocument();
  });
});
