import '@testing-library/jest-dom';

import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { mockedUseRegisterMutation } from '@/__tests__/mocks/mockedApolloHooks';
import { mockLocalStorage } from '@/__tests__/mocks/mockedLocalStorage';
import { Register } from '@/pages/Register';
import store from '@/redux/Store';
import { registerFields } from '@/utils/RegisterUtils';
import { mockedData, registerMocks } from '@/utils/TestsUtils';

const { setItemMock } = mockLocalStorage();

test('Render each component needed in register correctly', async () => {
  const view = render(
    <BrowserRouter>
      <Provider store={store}>
        <MockedProvider mocks={registerMocks} addTypename={false}>
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

test('fill the inputs and send data', async () => {
  const view = render(
    <BrowserRouter>
      <Provider store={store}>
        <MockedProvider mocks={registerMocks} addTypename={false}>
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

  await waitFor(() => {
    registerFields.forEach(async (field) => {
      const input = view.container.querySelector(
        `input[name="${field.name}"]`,
      ) as Element;

      expect(input).toHaveValue(mockedData[`${field.name}`]);
    });
    expect(view.queryByTestId('send-btn')).not.toBeDisabled();
  });

  fireEvent.click(view.queryByTestId('send-btn') as Element);

  await waitFor(() => {
    expect(mockedUseRegisterMutation).toHaveBeenCalled();
    expect(setItemMock).toHaveBeenCalled();
  });
});
