import React, { useContext, useState } from 'react';
import { ServiceContext } from '../context/ServiceContext';
import './Service.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Service = () => {
  const { services } = useContext(ServiceContext);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [confirmedService, setConfirmedService] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(false); // New state for loading
  const categories = Array.from(new Set(services.map((service) => service.service_name.split(' - ')[0])));

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setSortBy('');
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setShowPopup(true);
  };

  const handleSortByCost = (value) => {
    setSortBy(value);
  };

  const handleConfirmService = () => {
    setLoading(true);

    fetch(`http://localhost:3000/customer_services/${selectedService.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ is_booked: true }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to update service');
        }
      })
      .then((data) => {
        setConfirmedService(selectedService);
        // Handle any additional logic based on the response data, if needed
      })
      .catch((error) => {
        console.error('Error updating service:', error);
        // Handle the error state and display an error message, if desired
      })
      .finally(() => {
        setLoading(false);
        setShowPopup(true);
      });
  };


  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      // If the search query is empty, reset the selected category and sorting
      setSelectedCategory('');
      setSortBy('');
    } else {
      // Filter the services based on the search query
      const filteredServices = services.filter((service) =>
        service.service_name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (filteredServices.length > 0) {
        // Set the selected category to the category of the first filtered service
        setSelectedCategory(filteredServices[0].service_name.split(' - ')[0]);
      } else {
        // Reset the selected category if no matching services are found
        setSelectedCategory('');
      }
    }
  };

  const renderSubcategories = (mainCategory) => {
    if (selectedCategory === mainCategory) {
      return categories
        .filter((category) => category.startsWith(mainCategory))
        .map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`subcategory ${category === selectedCategory ? 'active' : ''}`}
          >
            {category.split(' - ')[1]}
          </button>
        ));
    }
    return null;
  };

  const renderServices = () => {
    if (selectedCategory === '') {
      return null;
    }

    const filteredServices = services.filter(
      (service) => service.service_name.split(' - ')[0] === selectedCategory
    );

    // Apply sorting based on the sortBy value
    let sortedServices = filteredServices;
    if (sortBy === 'lowest') {
      sortedServices = filteredServices.sort((a, b) => a.service_cost - b.service_cost);
    } else if (sortBy === 'highest') {
      sortedServices = filteredServices.sort((a, b) => b.service_cost - a.service_cost);
    }

    return sortedServices.map((service) => {
      const hierarchy = service.service_name.split(' - ');
      const lastTwoNames = hierarchy.slice(-2);

      return (
        <div key={service.id} className="data-item">
          <img src={service.image_url} alt={service.service_name} />
          <h3>{lastTwoNames.join(' - ')}</h3>
          <p>{service.service_description}</p>
          <p>Cost: {service.service_cost}</p>
          <p>Head of Service: {service.head_of_service}</p>
          <button onClick={() => handleServiceClick(service)}>Hire Service</button>
        </div>
      );
    });
  };

  const handleMainLinkClick = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  return (
    <div className="service-container">
      <div className="top-section">
        <h3>Services</h3>
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
          />
          <button className="search-icon" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div className="main-links">
        <button
          onClick={() => handleMainLinkClick('Food Menu')}
          className={`main-link ${selectedCategory === 'Food Menu' ? 'active' : ''}`}
        >
          Food Menu
        </button>
        {renderSubcategories('Food Menu')}
        <button
          onClick={() => handleMainLinkClick('Transport')}
          className={`main-link ${selectedCategory === 'Transport' ? 'active' : ''}`}
        >
          Transport
        </button>
        {renderSubcategories('Transport')}
        <button
          onClick={() => handleMainLinkClick('Cinema')}
          className={`main-link ${selectedCategory === 'Cinema' ? 'active' : ''}`}
        >
          Cinemax Theater
        </button>
        {renderSubcategories('Cinema')}
        <button
          onClick={() => handleMainLinkClick('Recreational Amenities')}
          className={`main-link ${selectedCategory === 'Recreational Amenities' ? 'active' : ''}`}
        >
          Recreational Amenities
        </button>
        {renderSubcategories('Recreational Amenities')}
      </div>
      <div className="sort-dropdown">
        <button className="sort-button">Sort by Cost</button>
        <div className="sort-options">
          <button onClick={() => handleSortByCost('lowest')}>Lowest to Highest</button>
          <button onClick={() => handleSortByCost('highest')}>Highest to Lowest</button>
        </div>
      </div>
      <div className="data-container">{renderServices()}</div>
      {showPopup && selectedService && (
        <div className="popup-container">
          <div className="popup-wrapper">
            <div className="popup-image">
              <img src={selectedService.image_url}alt={selectedService.service_name} />
            </div>
            <div className="popup-text">
              <h1 className="popup-title">{selectedService.service_name}</h1>
              <div className="popup-price">{selectedService.service_cost}</div>
              <p className="popup-description">{selectedService.service_description}</p>
              {!loading ? (
                <button onClick={handleConfirmService} className="popup-button">
                  Confirm Service
                </button>
              ) : (
                <div>Loading...</div>
              )}
            </div>
            <button className="popup-close-button" onClick={() => setShowPopup(false)}>
              X
            </button>
          </div>
        </div>
      )}
      {confirmedService && (
        <div className="popup-container">
          <div className="popup-wrapper">
            <h1 className="popup-title">Service Booked</h1>
            <p className="popup-description">Your service has been successfully booked!</p>
            <button className="popup-button" onClick={() => setConfirmedService(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
