import '../index.css';

import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { Home } from '@/pages/Home';

import { Bye } from './pages/bye/Bye';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ProtectedRoutes } from './utils/ProtectedRoutes';

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
          </ul>
        </nav>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/bye" element={<Bye />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
};
