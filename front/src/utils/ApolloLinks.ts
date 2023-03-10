import { ApolloLink, Observable } from '@apollo/react-hooks';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import { tokenActions } from '@/redux/reducers/TokenReducer';
import store from '@/redux/Store';

export const tokenLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = store.getState().accessToken;
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
    store.dispatch(tokenActions.setToken(accessToken));
  },
  handleResponse: () => {
    return;
  },
  handleError: () => {
    store.dispatch(tokenActions.setToken(''));
  },
});

export const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((operation) => {
          const accessToken = store.getState().accessToken;
          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `bearer ${store.getState().accessToken}`,
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
