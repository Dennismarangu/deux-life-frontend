import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Box } from '@chakra-ui/react';

const BookingForm = ({ room, onBookingSubmit }) => {
  const initialValues = {
    user_name: '',
    check_in_date: '',
    check_out_date: ''
  };

  const validationSchema = Yup.object({
    user_name: Yup.string().required('User name is required'),
    check_in_date: Yup.date().required('Check-in date is required'),
    check_out_date: Yup.date()
      .required('Check-out date is required')
      .min(Yup.ref('check_in_date'), 'Check-out date must be after check-in date')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    onBookingSubmit(values);
    setSubmitting(false);
  };

  return (
    <Box p={4} boxShadow="md" borderRadius="md" bg="white">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {formik => (
          <Form>
            <Field name="user_name">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.user_name && form.touched.user_name}>
                  <FormLabel htmlFor="user_name">User Name</FormLabel>
                  <Input {...field} id="user_name" placeholder="User Name" />
                  <FormErrorMessage>{form.errors.user_name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="check_in_date">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.check_in_date && form.touched.check_in_date}>
                  <FormLabel htmlFor="check_in_date">Check-in Date</FormLabel>
                  <Input {...field} type="date" id="check_in_date" placeholder="Check-in Date" />
                  <FormErrorMessage>{form.errors.check_in_date}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="check_out_date">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.check_out_date && form.touched.check_out_date}>
                  <FormLabel htmlFor="check_out_date">Check-out Date</FormLabel>
                  <Input {...field} type="date" id="check_out_date" placeholder="Check-out Date" />
                  <FormErrorMessage>{form.errors.check_out_date}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button mt={4} colorScheme="teal" isLoading={formik.isSubmitting} type="submit">
              Book Now
            </Button>
            <ErrorMessage name="user_name" component="div" />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default BookingForm;
