import React, { useState, useContext } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Container,
  Box,
  Grid,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const customerSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  username: Yup.string().required('Username is required'),
  phone: Yup.string()
    .min(10, 'Phone number should have 10 digits')
    .max(10, 'Phone number cannot have more than 10 digits')
    .optional(),
  email: Yup.string()
    .email('Enter a valid email address')
    .required('Email address is required'),
  password: Yup.string()
    .min(5, 'Password cannot be less than 5 characters')
    .required('Password is required'),
});

export const Signup = () => {
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const handleSubmit = async (values, { setSubmitting }) => {
    setError('');
    try {
      const response = await fetch('/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        // This means there are errors
        setError(data[0]);
      } else {
        // success
        login(data.customer);
      }
    } catch (error) {
      console.log('Errors', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxW="xs">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Text fontSize="2xl">Sign up</Text>
        {error && <Box color="red">{error}</Box>}
        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            username: '',
            phone: '',
            email: '',
            password: '',
          }}
          validationSchema={customerSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
              <Grid gap={3}>
                <Field name="first_name">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.first_name && form.touched.first_name}
                    >
                      <FormLabel htmlFor="first_name">First Name</FormLabel>
                      <Input {...field} id="first_name" placeholder="First Name" />
                      <FormErrorMessage>{form.errors.first_name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="last_name">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.last_name && form.touched.last_name}
                    >
                      <FormLabel htmlFor="last_name">Last Name</FormLabel>
                      <Input {...field} id="last_name" placeholder="Last Name" />
                      <FormErrorMessage>{form.errors.last_name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

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

                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel htmlFor="email">Email Address</FormLabel>
                      <Input {...field} id="email" placeholder="Email Address" />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="phone">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.phone && form.touched.phone}
                    >
                      <FormLabel htmlFor="phone">Phone Number</FormLabel>
                      <Input {...field} id="phone" placeholder="Phone Number" />
                      <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
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
                  colorScheme="blue"
                  isLoading={props.isSubmitting}
                >
                  Sign Up
                </Button>

                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <ChakraLink as={Link} to="/login" variant="body2">
                      Already have an account? Sign in
                    </ChakraLink>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Signup;
