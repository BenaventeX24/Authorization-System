import '@testing-library/jest-dom';

import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { mockedUseLoginMutation } from '@/__tests__/mocks/mockedApolloHooks';
import { mockLocalStorage } from '@/__tests__/mocks/mockedLocalStorage';
import Login from '@/pages/Login';
import store from '@/redux/Store';
import { loginFields } from '@/utils/LoginUtils';
import { loginMocks, mockedData } from '@/utils/TestsUtils';

const { setItemMock } = mockLocalStorage();

test('Render each component needed in register correctly', async () => {
  const view = render(
    <BrowserRouter>
      <Provider store={store}>
        <MockedProvider mocks={loginMocks} addTypename={false}>
          <Login />
        </MockedProvider>
      </Provider>
    </BrowserRouter>,
  );

  loginFields.forEach((field) => {
    expect(
      view.container.querySelector(`input[name="${field.name}"]`),
    ).toBeInTheDocument();
  });
  expect(view.queryByTestId('send-btn')).toBeInTheDocument();
});

test('fill the inputs and send data', async () => {
  const view = render(
    <BrowserRouter>
      <Provider store={store}>
        <MockedProvider mocks={loginMocks} addTypename={false}>
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

  await waitFor(() => {
    loginFields.forEach(async (field) => {
      const input = view.container.querySelector(
        `input[name="${field.name}"]`,
      ) as Element;

      expect(input).toHaveValue(mockedData[`${field.name}`]);
      expect(view.queryByTestId('send-btn')).not.toBeDisabled();
    });
  });

  fireEvent.click(view.queryByTestId('send-btn') as Element);

  await waitFor(() => {
    expect(mockedUseLoginMutation).toHaveBeenCalled();
    expect(setItemMock).toHaveBeenCalled();
  });
});
