import React, { useEffect, useState } from 'react';

import { setAccessToken } from './accessToken';
import { AppRoutes } from './AppRoutes';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/refresh-token', {
      method: 'POST',
      credentials: 'include',
    }).then(async (x) => {
      try {
        setAccessToken(await x.json());
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
