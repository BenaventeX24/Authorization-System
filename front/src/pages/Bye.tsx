import { CircularProgress } from '@mui/material';
import React from 'react';

import { useByeQuery } from '@/generated/graphql';

export const Bye: React.FC = () => {
  const { data, loading } = useByeQuery({
    fetchPolicy: 'network-only',
  });

  if (loading) return <CircularProgress />;

  return <div>a {data?.bye}</div>;
};
