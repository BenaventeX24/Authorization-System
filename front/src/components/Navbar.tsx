import { styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ProfileNavbar from '@/components/ProfileNavbar';
import { RootState } from '@/redux/redux';

export const CustomLink = styled(Link)`
  margin: 0 10px;
  text-decoration: none;
  color: white;
`;

export const Navbar = () => {
  const TOKEN = useSelector((state: RootState) => state.accessToken);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {TOKEN ? (
            <>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <CustomLink to="/">Home</CustomLink>
              </Typography>
              <CustomLink to="/bye">Bye</CustomLink>
              <CustomLink to="/logout">Logout</CustomLink>
              <ProfileNavbar />
            </>
          ) : (
            <>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                BenaventeX24
              </Typography>
              <CustomLink to="/register">Register</CustomLink>
              <CustomLink to="/login">Login</CustomLink>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
