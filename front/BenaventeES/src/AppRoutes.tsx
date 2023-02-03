import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { Home } from '@/pages/Home';

import { Bye } from './pages/Bye';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export const AppRoutes: React.FC = () => {
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bye" element={<Bye />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
