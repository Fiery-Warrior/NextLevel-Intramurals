import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ResetPassword() {
  const [resetError, setResetError] = React.useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get('email'),
      stuID: data.get('stuID'),
      password: data.get('password'),
      confPassword: data.get('confPassword'),
    };
    // Check if email ends with "@dbu.edu"
    if (userData.password != userData.confPassword) {
      setResetError('Passwords do not match. Please try again.');
      return; // Stop the form submission
    }
    
    try {
      // Sending data to the backend API
      const response = await axios.post('http://localhost:3001/reset', userData);
      console.log(response.data);
      // On successful registration, you might want to clear the error or navigate the user to a different page
      setResetError('Password Reset!');
      //window.history.pushState(null, '', '/profile');
    } catch (error) {
      console.error('An error occurred during reset:', error);
    if (error.response?.status === 404) {
        setResetError('User not found. Please check your credentials.');
    } else {
        setResetError(error.response?.data || 'An unexpected error occurred during reset.');
    }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password Request
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="E-mail address"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="stuID"
                  label="Student ID"
                  name="stuID"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  type="password"
                  label="New Password"
                  name="password"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confPassword"
                  type="password"
                  label="Confirm Password"
                  id="confPassword"
                />
              </Grid>
            </Grid>
            {resetError && (
            <Grid item xs={12}>
              <Typography color="error" align="center">
                 {resetError}
              </Typography>
             </Grid>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}