import { CircularProgress } from '@mui/material';
import React from 'react';
import { Navigate } from 'react-router-dom';

import { useLogOutQuery } from '@/generated/graphql';

export const Logout: React.FC = () => {
  const { data, loading } = useLogOutQuery({
    fetchPolicy: 'network-only',
  });

  if (loading) return <CircularProgress />;

  return data?.logout ? <Navigate to="/login" /> : <></>;
};
