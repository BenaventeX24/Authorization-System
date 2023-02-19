import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloLink, ApolloProvider } from '@apollo/react-hooks';
import ReactDOM from 'react-dom';

import { authLink, requestLink, tokenLink } from '@/ApolloLinks';

import { App } from './App';

const client = new ApolloClient({
  link: ApolloLink.from([
    tokenLink,
    requestLink,
    authLink,

    new HttpLink({
      uri: 'http://localhost:8000/api',
      credentials: 'include',
    }),
  ]),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
