import { CircularProgress } from '@mui/material';
import React from 'react';
import { Navigate } from 'react-router-dom';

import { useLogOutQuery } from '@/generated/graphql';
import { tokenActions } from '@/redux/reducers/tokenReducer';
import store from '@/redux/redux';

export const Logout: React.FC = () => {
  const { data, loading } = useLogOutQuery({
    fetchPolicy: 'network-only',
  });

  if (loading) return <CircularProgress />;

  if (data?.logout) {
    store.dispatch(tokenActions.setToken(''));
    return <Navigate to="/login" />;
  } else return <></>;
};
