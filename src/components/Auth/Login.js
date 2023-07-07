import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { loginValidator } from "../../utils/validators/auth.validators";
import { DynamicContext } from "../../utils/context/AuthContext"; // Update the import statement
import axios from "axios";

export default function LoginPage() {
  const dynamicContext = useContext(DynamicContext); // Access the dynamic context

  const handleSubmit = async (values) => {
    try {
      // Send a POST request to create a booking
      const response = await axios.post("/bookings", values);
      console.log(response.data);

      // Send a GET request to retrieve services
      const servicesResponse = await axios.get("/services");
      console.log(servicesResponse.data);

      // Send a POST request to create a customer service
      await axios.post("/customer_services", values);

      // Send a GET request to retrieve a specific service
      const serviceId = 123; // Replace with the actual ID
      const serviceResponse = await axios.get(`/services/${serviceId}`);
      console.log(serviceResponse.data);

      // ... continue with other requests

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DynamicContext.Provider value={dynamicContext}>
      <div>
        
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidator}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Field name="email" type="email" as={Input} />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Field name="password" type="password" as={Input} />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
              </FormControl>

              <Button colorScheme="blue" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </DynamicContext.Provider>
  );
}
