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
