import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box, Container, Link, Typography } from '@mui/material';
import React from 'react';

import Navbar from '@/components/Navbar';
import { useGetUsersQuery } from '@/generated/graphql';

export const Home: React.FC = () => {
  const { data } = useGetUsersQuery({ fetchPolicy: 'network-only' });
  if (!data) return <div>loading...</div>;

  return (
    <>
      <Navbar />
      <Container maxWidth={false} sx={{ padding: '20px' }}>
        <Typography variant="h4" sx={{}}>
          Welcome!
        </Typography>
        <Typography>
          Thanks for loggin in my first professional and secure auth system
        </Typography>
        <Box sx={{ marginTop: '10px' }}>
          <Typography>Follow me on:</Typography>
          <Box sx={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
            <Link href="https://github.com/BenaventeX24" target="_blank" rel="noopener">
              <GitHubIcon sx={{ fontSize: '40px' }} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/mat%C3%ADas-benavente-a8398123a/"
              target="_blank"
              rel="noopener"
            >
              <LinkedInIcon sx={{ fontSize: '40px' }} />
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};
