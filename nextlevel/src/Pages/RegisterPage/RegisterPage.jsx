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
import { useCookies } from 'react-cookie';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        NextLevelIntramurals.com 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function RegisterPage() {
  const [cookies, setCookie] = useCookies(['myCookie']);
  const [registrationError, setRegistrationError] = React.useState('');
  
  
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   const userData = {
  //     firstName: data.get('firstName'),
  //     lastName: data.get('lastName'),
  //     email: data.get('email'),
  //     password: data.get('password'),
  //     stuID: data.get('stuID'),
  //     sex: data.get('sex')
  //   };
  
  //   // Check if email ends with "@dbu.edu"
  //   if (!userData.email.endsWith("@dbu.edu")) {
  //     setRegistrationError('Registration requires a DBU email address.');
  //     return; // Stop the form submission
  //   }
  
  //   try {
  //     // Sending data to the backend API
  //     const response = await axios.post('http://localhost:3001/register', userData);
  //     console.log(response.data);
  //     // On successful registration, you might want to clear the error or navigate the user to a different page
  //     setRegistrationError('Registration Success!');
  //     window.location.href = `/profile?email=${userData.email}`; // Redirect to profile page with email as query parameter

  //     //  login after successful registration
  //   const loginResponse = await axios.post('http://localhost:3001/login', userData);
  //   if (loginResponse.status === 200) {
  //     // Set the cookie or authentication token after login
  //     setCookie('myCookie', { email: userData.email }, { path: '/' });
  //     window.location.href = `/profile?email=${userData.email}`; // Redirect to profile page
  //   }
    
  //   }catch (error) {
  //     console.error('An error occurred during registration:', error);
  //     // Display backend error message or a default error message
  //     setRegistrationError(error.response?.data?.message || 'An unexpected error occurred during registration.');
  //   }
  // };

  // Inside handleSubmit function in RegisterPage.js
const handleSubmit = async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const userData = {
    firstName: data.get('firstName'),
    lastName: data.get('lastName'),
    email: data.get('email'),
    password: data.get('password'),
    stuID: data.get('stuID'),
    sex: data.get('sex')
  };

  // Check if email ends with "@dbu.edu"
  if (!userData.email.endsWith("@dbu.edu")) {
    setRegistrationError('Registration requires a DBU email address.');
    return; // Stop the form submission
  }

  try {
    // Sending data to the backend API
    const response = await axios.post('http://localhost:3001/register', userData);
    console.log(response.data);
    // On successful registration, you might want to clear the error or navigate the user to a different page
    setRegistrationError('Registration Success!');

    // Login after successful registration
    const loginResponse = await axios.post('http://localhost:3001/login', userData);
    if (loginResponse.status === 200) {
      // Set the cookie or authentication token after login
      setCookie('myCookie', { email: userData.email }, { path: '/' });
      // Redirect to profile page only after setting the cookie
      window.location.href = `/profile?email=${userData.email}`;
    }
  } catch (error) {
    console.error('An error occurred during registration:', error);
    // Display backend error message or a default error message
    setRegistrationError(error.response?.data?.message || 'An unexpected error occurred during registration.');
  }
};


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          {/* <Typography component="h1" variant="h5">
            Create an Account - join the winning team!
          </Typography> */}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="DBU Email Address"
                  name="email"
                  autoComplete="email"
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
                <FormControl component="fieldset">
                  
                  <RadioGroup
                    row
                    aria-labelledby="sex-radio-buttons-group-label"
                    name="sex"
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                  </RadioGroup>

                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            {registrationError && (
            <Grid item xs={12}>
              <Typography color="error" align="center">
                 {registrationError}
              </Typography>
             </Grid>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Create an account - Join the winning team!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}