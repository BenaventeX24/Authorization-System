import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useLogOutQuery } from '@/generated/graphql';
import { tokenActions } from '@/redux/reducers/tokenReducer';
import store from '@/redux/redux';

export const Logout: React.FC = () => {
  const { data, loading } = useLogOutQuery({
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    store.dispatch(tokenActions.setToken(''));
  }, [data]);

  if (loading) return <CircularProgress />;

  return <Navigate to="/login" />;
};
