import '@testing-library/jest-dom';

import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Login from '@/pages/Login';
import store from '@/redux/Store';
import { ErrorMessages } from '@/utils/ErrorMessages';
import { loginFields } from '@/utils/LoginUtils';
import { mockedData, wrongCredentialsMock } from '@/utils/TestsUtils';

test('Wrong credenctials', async () => {
  const view = render(
    <BrowserRouter>
      <Provider store={store}>
        <MockedProvider mocks={wrongCredentialsMock} addTypename={false}>
          <Login />
        </MockedProvider>
      </Provider>
    </BrowserRouter>,
  );

  loginFields.forEach(async (field) => {
    const input = view.container.querySelector(`input[name="${field.name}"]`);
    fireEvent.change(input as Element, {
      target: { value: mockedData[`${field.name}`] },
    });
  });

  fireEvent.click(view.queryByTestId('send-btn') as Element);

  await waitFor(() => {
    expect(view.getByText(ErrorMessages.WRONG_CREDENTIALS)).toBeInTheDocument();
  });
});
