import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloLink, ApolloProvider } from '@apollo/react-hooks';
import ReactDOM from 'react-dom';

import { requestLink, tokenLink } from '@/utils/ApolloLinks';

import { App } from './App';

export const client = new ApolloClient({
  link: ApolloLink.from([
    tokenLink,
    requestLink,

    new HttpLink({
      uri: import.meta.env.VITE_SERVER_URL,
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
