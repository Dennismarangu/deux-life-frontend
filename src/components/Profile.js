import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  HStack,
  Box,
  Heading,
} from "@chakra-ui/react";

const Profile = ({ customerId }) => {
  const [customerProfile, setCustomerProfile] = useState({});
  const [authentication, setAuthentication] = useState(true);

  useEffect(() => {
    const fetchCustomerProfile = async () => {
      try {
        const response = await fetch(
         `/customers/${customerId}`
        ); // Replace ":customerId" with the actual ID of the logged-in customer
        if (response.ok) {
          const profileData = await response.json();
          setCustomerProfile(profileData);
          setAuthentication(true); // Update the authentication state to true
        } else {
          const errorData = await response.json();
          console.error("Failed to fetch customer profile:", errorData);
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching customer profile:",
          error
        );
      }
    };

    fetchCustomerProfile();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  });

  const handleUpdateAccount = async (values) => {
    try {
      const response = await fetch(
       `/customers/${customerId}`,
        {
          method: "PATCH", // Use the appropriate HTTP method for updating the customer's account
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        console.log("Account updated successfully");
        // Optionally, you can fetch the updated customer profile here or display a success message
      } else {
        const errorData = await response.json();
        console.error("Failed to update account:", errorData);
        // Display an error message or handle the error accordingly
      }
    } catch (error) {
      console.error("An error occurred while updating account:", error);
      // Handle the error condition
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(
       `/customers/${customerId}`,
        {
          method: "DELETE",
          headers:{
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Account deleted successfully");
        setAuthentication(false);
        setCustomerProfile({});
      } else {
        const errorData = await response.json();
        console.error("Failed to delete account:", errorData);
      }
    } catch (error) {
      console.error("An error occurred while deleting account:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/logout", {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Logout successful");
        setAuthentication(false);
        setCustomerProfile({});
      } else {
        const errorData = await response.json();
        console.error("Failed to logout:", errorData);
      }
    } catch (error) {
      console.error("An error occurred while logging out:", error);
    }
  };

  return (
    <Box
      bg="cream" // Set the background color to cream
      minHeight="100vh" // Set the minimum height of the box to the viewport height
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={8}

    >
        <Box p={8} >
        <Heading mb={8} textAlign="center" fontSize="2xl">
          User Profile
        </Heading>


      <Formik
        initialValues={{
          name: customerProfile?.name || "",
          email: customerProfile?.email || "",
          password: "",
          password_confirmation: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleUpdateAccount}
      >
        <Form>
          <Field name="name">
            {({ field, form }) => (
            <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  {...field}
                  id="name"
                  placeholder="Name"
                  variant="filled"
                  bg="gray.100"
                  _hover={{ bg: "gray.200" }}
                  _focus={{ bg: "white" }}
                />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="email">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.email && form.touched.email}>
                <FormLabel spacing={10} mt={30} htmlFor="email">
                  Email
                </FormLabel>
                <Input
                  {...field}
                  id="email"
                  placeholder="Email"
                  variant="filled"
                  bg="gray.100"
                  _hover={{ bg: "gray.200" }}
                  _focus={{ bg: "white" }}
                />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="password">
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.password && form.touched.password}
              >
                <FormLabel spacing={10} mt={30} htmlFor="password">
                  Password
                </FormLabel>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  placeholder="Password"
                  variant="filled"
                  bg="gray.100"
                  _hover={{ bg: "gray.200" }}
                  _focus={{ bg: "white" }}
                />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="password_confirmation">
            {({ field, form }) => (
              <FormControl
                isInvalid={
                  form.errors.password_confirmation &&
                  form.touched.password_confirmation
                }
              >
                <FormLabel spacing={10} mt={30} htmlFor="password_confirmation">
                  Confirm Password
                </FormLabel>
                <Input
                  {...field}
                  id="password_confirmation"
                  type="password"
                  placeholder="Confirm Password"
                  variant="filled"
                  bg="gray.100"
                  _hover={{ bg: "gray.200" }}
                  _focus={{ bg: "white" }}
                />
                <FormErrorMessage>
                  {form.errors.password_confirmation}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <HStack spacing={10} mt={30}>
            <Button color="blue" type="submit">
              Update Account
            </Button>
            <Button color="red" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
            <Button  onClick={handleLogout}>
              Logout
            </Button>
          </HStack>
        </Form>
      </Formik>
    </Box>
    </Box>
  );
};

export default Profile;
