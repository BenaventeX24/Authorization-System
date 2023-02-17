import { CircularProgress } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';

import { getAuthentication } from '@/accessToken';
import { useByeQuery } from '@/generated/graphql';

export const ProtectedRoutes = () => {
  const { loading } = useByeQuery({
    fetchPolicy: 'network-only',
  });

  if (loading) return <CircularProgress />;

  console.log(getAuthentication());
  return getAuthentication() ? <Outlet /> : <Navigate to="/login" />;
};
