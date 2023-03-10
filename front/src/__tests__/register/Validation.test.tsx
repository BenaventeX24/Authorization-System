import '@testing-library/jest-dom';

import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ZodError } from 'zod';

import { Register } from '@/pages/Register';
import store from '@/redux/Store';
import { registerFields } from '@/utils/RegisterUtils';
import { registerMocks } from '@/utils/TestsUtils';

test('A popover should show telling the user what input validation is missing', async () => {
  const view = render(
    <BrowserRouter>
      <Provider store={store}>
        <MockedProvider mocks={registerMocks} addTypename={false}>
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
      expect(view.queryByTestId('validation-popover')).toHaveTextContent(issue.message);
    });

    //The close popover in real UI is called by clicking anywhere in the page
    //as Popover generates this component using the hole window
    userEvent.click(popover);

    waitForElementToBeRemoved(() => popover);
  });
});
