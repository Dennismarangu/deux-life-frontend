import React, { useState, useContext } from 'react';
import { Alert, Avatar, Box, Container, Grid, Link as MuiLink, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { AuthContext } from '../context';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export const Login = () => {
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);

  const handleSubmit = async (values) => {
    try {
      const response = await fetch('/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data instanceof Array) {
        setError(data[0]);
      } else if (data.status === 'error') {
        setError(data.message);
      } else {
        // success
        login(data.user);
      }
    } catch (error) {
      setError('Internal server error');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          <Form noValidate>
            <Field
              as={TextField}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              error={
                formik.touched.username &&
                Boolean(formik.errors.username)
              }
              helperText={
                formik.touched.username &&
                formik.errors.username
              }
            />
            <Field
              as={TextField}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={
                formik.touched.password &&
                Boolean(formik.errors.password)
              }
              helperText={
                formik.touched.password &&
                formik.errors.password
              }
            />

            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={formik.isSubmitting}
            >
              Login
            </LoadingButton>
            <Grid container>
              <Grid item>
                <MuiLink
                  to="/signup"
                  variant="body2"
                  component={Link}
                >
                  {"Don't have an account? Sign Up"}
                </MuiLink>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};
