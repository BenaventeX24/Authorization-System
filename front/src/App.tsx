import React, { useEffect, useState } from 'react';

import { AppRoutes } from '@/AppRoutes';
import { tokenActions } from '@/redux/reducers/TokenReducer';
import store from '@/redux/Store';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('userdata')) {
      fetch(import.meta.env.VITE_SERVER_REFRESH_TOKEN as string, {
        method: 'POST',
        credentials: 'include',
      }).then(async (x) => {
        try {
          store.dispatch(tokenActions.setToken(await x.json()));
          setLoading(false);
        } catch (e) {
          setLoading(false);
        }
      });
    } else setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return <AppRoutes></AppRoutes>;
};
