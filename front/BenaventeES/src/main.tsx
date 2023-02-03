import { ApolloClient, createHttpLink, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloLink, ApolloProvider, Observable, Operation } from '@apollo/react-hooks';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
import React from 'react';
import ReactDOM from 'react-dom';

import { getAccessToken, setAccessToken } from '@/accessToken';

import { App } from './App';

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : '',
    },
  };
});

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((operation) => {
          const accessToken = getAccessToken();
          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `bearer ${accessToken}`,
              },
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    }),
);

const tokenLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();

    if (!token) {
      console.log('====================================');
      console.log('aja');
      console.log('====================================');
      return true;
    }

    try {
      const { exp } = jwtDecode(token) as any;

      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  },
  fetchAccessToken: async () => {
    return fetch('http://localhost:8000/refresh-token', {
      method: 'POST',
      credentials: 'include',
    }).then((response) => response.json());
  },
  handleFetch: (accessToken, _operation: Operation) => {
    return setAccessToken(accessToken);
  },
  handleResponse: (operation: Operation, accessTokenField) =>
    console.log(accessTokenField),
  handleError: (err: Error, operation: Operation) => {
    console.log('====================================');
    console.log(operation);
    console.log('====================================');
    console.error(err);
  },
});

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
