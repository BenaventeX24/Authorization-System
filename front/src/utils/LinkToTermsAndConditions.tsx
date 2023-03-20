import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

export const TermsAndConditionsLabel = (
  <Box sx={{ marginLeft: '8px' }}>
    I accept the {<Link to="/TermsAndConditions">terms and conditions</Link>}
  </Box>
);
