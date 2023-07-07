import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Input } from "@chakra-ui/react";

const Profile = () => {
  const [customerProfile, setCustomerProfile] = useState({});
  const [authentication, setAuthentication] = useState(true);

  useEffect(() => {
    const fetchCustomerProfile = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/customers/:customerId"); // Replace ":customerId" with the actual ID of the logged-in customer
        if (response.ok) {
          const profileData = await response.json();
          setCustomerProfile(profileData);
        } else {
          const errorData = await response.json();
          console.error("Failed to fetch customer profile:", errorData);
        }
      } catch (error) {
        console.error("An error occurred while fetching customer profile:", error);
      }
    };

    fetchCustomerProfile();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  });

  const handleUpdateAccount = async (values) => {
    const customerId = "123"; // Replace "123" with the actual customer ID

    try {
      const response = await fetch(`http://127.0.0.1:3000/api/customers/${customerId}`, {
        method: "PATCH", // Use the appropriate HTTP method for updating the customer's account
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

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
    const customerId = "123"; // Replace "123" with the actual customer ID

    try {
      const response = await fetch(`http://127.0.0.1:3000/api/customers/${customerId}`, {
        method: "DELETE", // Use the appropriate HTTP method for deleting the customer's account
      });

      if (response.ok) {
        console.log("Account deleted successfully");
        // Optionally, you can perform additional actions after deleting the account
      } else {
        const errorData = await response.json();
        console.error("Failed to delete account:", errorData);
        // Display an error message or handle the error accordingly
      }
    } catch (error) {
      console.error("An error occurred while deleting account:", error);
      // Handle the error condition
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/logout", {
        method: "DELETE", // Use the appropriate HTTP method for logging out the customer
      });

      if (response.ok) {
        console.log("Logout successful");
        setAuthentication(false); // Update the authentication state to false
        // Optionally, you can perform additional actions after logging out
      } else {
        const errorData = await response.json();
        console.error("Failed to logout:", errorData);
        // Display an error message or handle the error accordingly
      }
    } catch (error) {
      console.error("An error occurred while logging out:", error);
      // Handle the error condition
    }
  };

  return (
    <div>
      {authentication ? (
        <div>
          <h1>Profile</h1>
          <Formik
            initialValues={customerProfile}
            validationSchema={validationSchema}
            onSubmit={handleUpdateAccount}
          >
            <Form>
              <div>
                <label htmlFor="name">Name</label>
                <Field type="text" id="name" name="name" as={Input} />
                <ErrorMessage name="name" component="div" />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" as={Input} />
                <ErrorMessage name="email" component="div" />
              </div>

              {/* Add more fields from the customer profile here */}

              <Button colorScheme="blue" type="submit">
                Update Account
              </Button>
              <Button colorScheme="red" onClick={handleDeleteAccount}>
                Delete Account
              </Button>
              <Button onClick={handleLogout}>Logout</Button>
            </Form>
          </Formik>
        </div>
      ) : (
        <div>
          <p>Please log in to view your profile.</p>
          {/* Render a login form or redirect to the login page */}
        </div>
      )}
    </div>
  );
};

export default Profile;
