import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Input } from "@chakra-ui/react";

const profile = () => {
    const [customerProfile, setCustomerProfile] = useState({});
   const [authentication, setAuthentication] = useState(true);
}

useEffect(() => {
  const fetchCustomerProfile = async () => {
    try {
      const response = await fetch("/api/customers/:customerId"); // Replace ":customerId" with the actual ID of the logged-in customer
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

const handleUpdateAccount = (values) => {
  // Simulated API call to update the customer's account
  console.log("Update account:", values);
};



