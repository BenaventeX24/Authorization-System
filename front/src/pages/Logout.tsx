import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useLogoutQuery } from '@/generated/graphql';
import { tokenActions } from '@/redux/reducers/TokenReducer';

export const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading } = useLogoutQuery({
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data) {
      dispatch(tokenActions.setToken(''));
      localStorage.removeItem('userdata');
    }
  }, [data]);

  if (loading) return <CircularProgress />;

  return <Navigate to="/login" />;
};
