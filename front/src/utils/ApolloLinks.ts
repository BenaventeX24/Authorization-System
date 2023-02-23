//import { setContext } from '@apollo/client/link/context';
import { ApolloLink, Observable } from '@apollo/react-hooks';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import { getAccessToken, setAccessToken, setAuthentication } from '@/utils/accessToken';

export const tokenLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();
    if (!token) return true;
    try {
      const { exp } = jwtDecode(token) as JwtPayload;
      if (exp)
        if (Date.now() >= exp * 1000) return false;
        else return true;
      else return true;
    } catch (e) {
      return false;
    }
  },
  fetchAccessToken: async () => {
    return fetch('http://localhost:8000/refresh-token', {
      method: 'POST',
      credentials: 'include',
    }).then((response) => response.json());
  },
  handleFetch: (accessToken) => {
    setAuthentication(true);
    return setAccessToken(accessToken);
  },
  handleResponse: () => {
    return;
  },
  handleError: () => {
    setAuthentication(false);
  },
});

/*export const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : '',
    },
  };
});*/

export const requestLink = new ApolloLink(
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
