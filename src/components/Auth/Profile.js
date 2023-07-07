import { useContext } from 'react';
import {
  Avatar,
  Box,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  Text,
  Button,
} from '@chakra-ui/react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context';

const profileSchema = Yup.object().shape({
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
});

export const Profile = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <Container maxWidth="xs">
      <Box
        marginTop={8}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Avatar bg="secondary.main" m={1}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Text fontSize="2xl">Profile</Text>
        <Formik
          initialValues={{
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
            username: user?.username || '',
            phone: user?.phone || '',
            email: user?.email || '',
          }}
          validationSchema={profileSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Grid gap={3}>
              <Field name="first_name">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.first_name && form.touched.first_name}
                  >
                    <FormLabel htmlFor="first_name">First Name</FormLabel>
                    <Input {...field} id="first_name" placeholder="First Name" />
                    <ErrorMessage
                      name="first_name"
                      component={FormErrorMessage}
                    />
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
                    <ErrorMessage
                      name="last_name"
                      component={FormErrorMessage}
                    />
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
                    <ErrorMessage
                      name="username"
                      component={FormErrorMessage}
                    />
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
                    <ErrorMessage
                      name="phone"
                      component={FormErrorMessage}
                    />
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
                    <ErrorMessage
                      name="email"
                      component={FormErrorMessage}
                    />
                  </FormControl>
                )}
              </Field>

              <Button type="submit" colorScheme="blue">
                Update Account
              </Button>
            </Grid>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};
