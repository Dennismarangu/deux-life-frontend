import React, { createContext, useState, useEffect } from 'react';

export const ServiceContext = createContext();

const ServiceContextProvider = (props) => {
  const [services, setServices] = useState([]);
  const [login, setLogin] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    fetch('http://localhost:3000/services')
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error('Error fetching services:', error));
  };

  const handleLogin = (username, password) => {
    // Perform the login logic here and set the login state accordingly
    // ...

    setLogin({ username, password });
  };

  return (
    <ServiceContext.Provider value={{ services, fetchServices, login, handleLogin }}>
      {props.children}
    </ServiceContext.Provider>
  );
};

export default ServiceContextProvider;
