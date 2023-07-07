import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

const BookingForm = ({ room }) => {
  const initialValues = {
    customerId: '',
    roomId: room.id,
    checkInDate: '',
    checkOutDate: ''
  };

  const validationSchema = Yup.object({
    customerId: Yup.string().required('Customer ID is required'),
    checkInDate: Yup.date().required('Check-in date is required'),
    checkOutDate: Yup.date().required('Check-out date is required')
  });

  const handleSubmit = (values, { setSubmitting, resetForm, setErrors }) => {
    // Make a POST request to the backend with the form data
    fetch('http://localhost:3000/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server
        console.log(data); // You can customize this based on your requirements
        // Display a visual confirmation of the successful booking
        alert('Booking successful!');
        // Reset the form
        resetForm();
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle errors if necessary
        setErrors({ submit: 'An error occurred. Please try again.' });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {formik => (
        <Form>
          <FormControl isInvalid={formik.errors.customerId && formik.touched.customerId}>
            <FormLabel htmlFor="customerId">Customer ID</FormLabel>
            <Input
              type="text"
              id="customerId"
              name="customerId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.customerId}
            />
            <FormErrorMessage>{formik.errors.customerId}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={formik.errors.checkInDate && formik.touched.checkInDate}>
            <FormLabel htmlFor="checkInDate">Check-in Date</FormLabel>
            <Input
              type="date"
              id="checkInDate"
              name="checkInDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.checkInDate}
            />
            <FormErrorMessage>{formik.errors.checkInDate}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={formik.errors.checkOutDate && formik.touched.checkOutDate}>
            <FormLabel htmlFor="checkOutDate">Check-out Date</FormLabel>
            <Input
              type="date"
              id="checkOutDate"
              name="checkOutDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.checkOutDate}
            />
            <FormErrorMessage>{formik.errors.checkOutDate}</FormErrorMessage>
          </FormControl>

          <Button mt={4} colorScheme="teal" isLoading={formik.isSubmitting} type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default BookingForm;
