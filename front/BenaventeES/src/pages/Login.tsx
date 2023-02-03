import React, { useState } from 'react';

import { setAccessToken } from '@/accessToken';
import { useLoginMutation } from '@/generated/graphql';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(email, password);
          const response = await login({
            variables: {
              email,
              password,
            },
          });
          if (response && response.data) setAccessToken(response.data?.login.accessToken);
        }}
      >
        <input
          value={email}
          placeholder="email"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
