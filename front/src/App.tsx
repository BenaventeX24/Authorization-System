import React, { useEffect, useState } from 'react';

import { AppRoutes } from '@/AppRoutes';
import { tokenActions } from '@/redux/reducers/tokenReducer';
import store from '@/redux/redux';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/refresh-token', {
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
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return <AppRoutes></AppRoutes>;
};
