import { Navigate, Outlet } from 'react-router-dom';

import { getAuthentication } from '@/accessToken';

export const ProtectedRoutes = () => {
  return getAuthentication() ? <Outlet /> : <Navigate to="/login" />;
};
