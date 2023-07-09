import React, { useState, useContext } from 'react';
import {
  Box,
  Container,
  Grid,
  Link as ChakraLink,
  Avatar,
  Text,
  Alert,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export const Login = () => {
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        setError(data[0]);
      } else if (data.status === 'error') {
        setError(data.message);
      } else {
        // success
        login(data.user);
      }
    } catch (error) {
      setError('Internal server error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxW="xs">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Avatar bg="secondary.main" m={1}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Text component="h1" variant="h5">
          Login
        </Text>
        {error && <Alert status="error">{error}</Alert>}
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form noValidate>
              <Field name="username">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.username && form.touched.username}
                  >
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input {...field} id="username" placeholder="Username" />
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="Password"
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                mt={3}
                mb={2}
                isLoading={props.isSubmitting}
              >
                Login
              </Button>
              <Grid container>
                <Grid item>
                  <ChakraLink as={Link} to="/signup" variant="body2">
                    Don't have an account? Sign Up
                  </ChakraLink>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Login;
