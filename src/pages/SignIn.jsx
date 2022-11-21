import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
/* import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; */
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';


export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (<div align="center">
    <Paper elevation={20} a sx={{  width: '35%', overflow: 'hidden' }}>

      <Container>
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ ':hover': {
                bgcolor: '#A0D5C2'},mt: 3, mb: 2 , backgroundColor:"#24936B"}}
            >
              Sign In
            </Button>
            <Grid container  sx={{p:3}}>
              <Grid item >
                <Link to={"/signUp"} variant="body2">
                  <Typography>
                     Forgot password?
                  </Typography>
                 
                </Link>
              </Grid>
              <Grid item md>
              <Link to={"/signUp"} variant="body2">
              <Typography>Don't have an account? Sign Up</Typography>
              
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Paper>
    </div>
  );
}
