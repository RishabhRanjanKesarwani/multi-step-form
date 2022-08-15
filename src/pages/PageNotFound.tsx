import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TEST_IDS } from '../constants';
import COLORS from '../utils/colors';

const image = 'https://www.pngitem.com/pimgs/m/255-2550411_404-error-images-free-png-transparent-png.png';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
      <Stack direction="row" justifyContent="center">
          <Box sx={{margin: '50px 80px', background: COLORS.white, padding: '50px 80px', borderRadius: '20px', width: 'fit-content'}}>
              <Stack direction="column" alignItems="center" spacing={2}>
                  <img src={image} alt="404" width={300} />
                  <Typography variant="h3">Page not found!</Typography>
                  <Typography variant="subtitle1" align="center" sx={{ maxWidth: '450px' }}>You landed on a route which does not exist. Please go to one of the following routes to use the application.</Typography>
                  <Stack spacing={2} direction={{ xs: 'column', sm: 'row', md: 'row', lg: 'row' }} >
                      <Button variant="contained" size="small" color="error" onClick={() => navigate('/')} data-testid={TEST_IDS.pageNotFoundHomeButton}>Home</Button>
                      <Button variant="contained" size="small" color="error" onClick={() => navigate('/signup')} data-testid={TEST_IDS.pageNotFoundSignupButton}>Sign up</Button>
                  </Stack>
              </Stack>
          </Box>
      </Stack>
  );
};

export default PageNotFound;