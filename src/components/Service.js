import React, { useContext, useState } from 'react';
import { ServiceContext } from './ServiceContext';

const Service = () => {
  const { services } = useContext(ServiceContext);
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const handleConfirmService = () => {
    // Implement your logic for confirming the service
    // This function will be called when the "Confirm Service" button is clicked in the popup
  };

  return (
    <div>
      {services.map((service) => (
        <div key={service.id}>
          <img src={service.image_url} alt={service.service_name} />
          <h3>{service.service_name}</h3>
          <button onClick={() => handleServiceClick(service)}>Hire Service</button>
        </div>
      ))}
      {selectedService && (
        <div className="popup">
          <img src={selectedService.image_url} alt={selectedService.service_name} />
          <h3>{selectedService.service_name}</h3>
          <button onClick={handleConfirmService}>Confirm Service</button>
        </div>
      )}
    </div>
  );
};

export default Service;

