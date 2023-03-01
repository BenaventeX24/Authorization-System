import React, { useEffect, useState } from 'react';

import { AppRoutes } from '@/AppRoutes';
import { tokenActions } from '@/redux/reducers/tokenReducer';
import { IUserData, userActions } from '@/redux/reducers/userReducer';
import store from '@/redux/store';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(import.meta.env.VITE_SERVER_REFRESH_TOKEN as string, {
      method: 'POST',
      credentials: 'include',
    }).then(async (x) => {
      try {
        store.dispatch(tokenActions.setToken(await x.json()));
        const userData: IUserData = JSON.parse(
          localStorage.getItem('userdata') as string,
        );
        if (userData) {
          store.dispatch(
            userActions.setData({ name: userData.name, surname: userData.surname }),
          );
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    });
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return <AppRoutes></AppRoutes>;
};
