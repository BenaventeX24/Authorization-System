import { CircularProgress } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';

import { useTestAuthQuery } from '@/generated/graphql';

export const ProtectedRoutes = () => {
  const { data, loading } = useTestAuthQuery({
    fetchPolicy: 'network-only',
  });

  if (loading) return <CircularProgress />;
  console.log(data?.testAuth);

  return data?.testAuth ? <Outlet /> : <Navigate to="/login" />;
};

export const PreventLogout = () => {
  const { data, loading } = useTestAuthQuery({
    fetchPolicy: 'network-only',
  });

  if (loading) return <CircularProgress />;

  return data?.testAuth ? <Navigate to="/" /> : <Outlet />;
};
