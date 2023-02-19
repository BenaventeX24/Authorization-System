import React from 'react';

import { useGetUsersQuery } from '@/generated/graphql';

export const Home: React.FC = () => {
  const { data } = useGetUsersQuery({ fetchPolicy: 'network-only' });
  if (!data) return <div>loading...</div>;

  return (
    <div>
      a
      {data.getEmails.map((user, i) => (
        <div key={i}>{user.email}</div>
      ))}
    </div>
  );
};
