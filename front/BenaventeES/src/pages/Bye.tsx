import React from 'react';

import { useByeQuery } from '@/generated/graphql';

export const Bye: React.FC = () => {
  const { data, loading } = useByeQuery({
    fetchPolicy: 'network-only',
  });
  if (loading) return <div>Loading...</div>;
  console.log(data?.bye);

  return <div>{data?.bye}</div>;
};
