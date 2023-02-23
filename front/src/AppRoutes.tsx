import '../index.css';

import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { Bye } from '@/pages/bye/Bye';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Logout } from '@/pages/Logout';
import { PreventLogout, ProtectedRoutes } from '@/pages/ProtectedRoutes';
import { Register } from '@/pages/Register';

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
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/bye">Bye</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </nav>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/bye" element={<Bye />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
            <Route element={<PreventLogout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
};
