import React from 'react';
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
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
// eslint-disable-next-line
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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get('returnUrl');

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Your form submission logic here

      // If successful, navigate to returnUrl or home page
      navigate(returnUrl ? returnUrl : '/');
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

                {/* Other form fields */}

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
