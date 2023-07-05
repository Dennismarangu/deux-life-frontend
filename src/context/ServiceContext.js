import React, { createContext, useState, useEffect } from 'react';

export const ServiceContext = createContext();

const ServiceContext = (props) => {
    const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    fetch('http://localhost:3000/services')
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error('Error fetching services:', error));
  };

  return (
    <ServiceContext.Provider value={{ services, fetchServices }}>
      {props.children}
    </ServiceContext.Provider>
  );

};


export default ServiceContext;
