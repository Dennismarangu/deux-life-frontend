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
    // Pass the form values to the parent component for handling the booking submission
    onBookingSubmit(values);

    // Reset the form
    setSubmitting(false);
  };

  return (
    <Box p={4} boxShadow="md" borderRadius="md" bg="white">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {formik => (
          <Form>
            <FormControl isInvalid={formik.errors.user_name && formik.touched.user_name}>
              <FormLabel htmlFor="user_name">User Name</FormLabel>
              <Input
                type="text"
                id="user_name"
                name="user_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.user_name}
              />
              <FormErrorMessage>{formik.errors.user_name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={formik.errors.check_in_date && formik.touched.check_in_date}>
              <FormLabel htmlFor="check_in_date">Check-in Date</FormLabel>
              <Input
                type="date"
                id="check_in_date"
                name="check_in_date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.check_in_date}
              />
              <FormErrorMessage>{formik.errors.check_in_date}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={formik.errors.check_out_date && formik.touched.check_out_date}>
              <FormLabel htmlFor="check_out_date">Check-out Date</FormLabel>
              <Input
                type="date"
                id="check_out_date"
                name="check_out_date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.check_out_date}
              />
              <FormErrorMessage>{formik.errors.check_out_date}</FormErrorMessage>
            </FormControl>

            <Button mt={4} colorScheme="teal" isLoading={formik.isSubmitting} type="submit">
              Book Now
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default BookingForm;
