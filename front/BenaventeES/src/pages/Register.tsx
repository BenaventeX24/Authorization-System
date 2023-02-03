import React, { useState } from 'react';

import { useRegisterMutation } from '@/generated/graphql';

export const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [register] = useRegisterMutation();
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(email, password);
          const response = await register({
            variables: {
              username,
              email,
              password,
            },
          });
          console.log(response);
        }}
      >
        <input
          value={username}
          placeholder="username"
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
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
