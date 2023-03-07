import { styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ProfileNavbar from '@/components/ProfileNavbar';
import { RootState } from '@/redux/store';

export const CustomLink = styled(Link)`
  margin: 0 10px;
  text-decoration: none;
  color: white;
`;

export const Navbar = () => {
  const TOKEN = useSelector((state: RootState) => state.accessToken);
  return (
    <AppBar
      position="relative"
      sx={{
        height: '66px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '15px',
      }}
    >
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <CustomLink to="/">Benavente</CustomLink>
      </Typography>
      {TOKEN ? (
        <ProfileNavbar />
      ) : (
        <>
          <CustomLink to="/register">Register</CustomLink>
          <CustomLink to="/login">Login</CustomLink>
        </>
      )}
    </AppBar>
  );
};

export default Navbar;
