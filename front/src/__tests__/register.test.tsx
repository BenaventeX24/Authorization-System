import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/react-hooks';
import { shallow } from 'enzyme';

import { Register } from '@/pages/Register';
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
        dog: { accessToken: 'token', username: 'username', name: 'name' },
      },
    },
  },
];

describe('Custom form fields tests', () => {
  const wrapper = shallow(
    //<BrowserRouter>
    //<Provider store={store}>
    <MockedProvider mocks={mocks} addTypename={false}>
      <Register />
    </MockedProvider>,
    //</Provider>,
    //</BrowserRouter>,
  );
  it('should render each input required in register form', () => {
    registerFields.forEach((field) => {
      expect(wrapper.find(`Field[name="${field.name}"]`)).toBeTruthy();
    });
  });

  //it('should render a label element with the given text', () => {});
  //it('should render a custom password field', () => {});
});
//<BrowserRouter>
//<Provider store={store}>
//<MockedProvider mocks={mocks} addTypename={false}>
