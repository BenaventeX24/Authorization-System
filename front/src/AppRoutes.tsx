import '../index.css';

import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '@/pages/Home';
import Login from '@/pages/Login';
import { Logout } from '@/pages/Logout';
import { PreventLogout, ProtectedRoutes } from '@/pages/ProtectedRoutes';
import Register from '@/pages/Register';
import TermsAndConditions from '@/pages/TermsAndConditions';
import store from '@/redux/Store';

export const AppRoutes: React.FC = () => {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    typography: {
      fontFamily: ['Assistant'].join(','),
    },
  });

  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
            <Route element={<PreventLogout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
};
