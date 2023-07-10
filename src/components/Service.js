import React, { useContext, useState } from 'react';
import { ServiceContext } from '../context/ServiceContext';
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  Text,
  Center,
  Spinner,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
          <Button
            key={category}
            onClick={() => handleCategoryClick(category)}
            variant={category === selectedCategory ? 'solid' : 'outline'}
            fontSize="xl"
          >
            {category.split(' - ')[1]}
          </Button>
        ));
    }
    return null;
  };

  const handleSortByCost = (value) => {
    setSortBy(value);
  };


  const renderServices = () => {
    if (selectedCategory === '') {
      return null;
    }


    const filteredServices = services.filter(
      (service) =>
        service.service_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        service.service_name.startsWith(selectedCategory)
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
        <GridItem key={service.id} className="data-item" boxShadow="md" borderRadius="md" p={4}>
          <Box>
            <Image src={service.image_url} alt={service.service_name} boxSize="100%" objectFit="cover" h={200} />
            <Heading fontSize="md" mt={2} noOfLines={2}>
              {lastTwoNames.join(' - ')}
            </Heading>
            <Text fontSize="sm" mt={2} noOfLines={4}>
              {service.service_description}
            </Text>
            <Text fontSize="sm" mt={2}>
              Cost: {service.service_cost}
            </Text>
            <Text fontSize="sm" mt={2}>
              Head of Service: {service.head_of_service}
            </Text>
          </Box>
          <Button onClick={() => handleServiceClick(service)} colorScheme="teal" mt={4}>
            Hire Service
          </Button>
        </GridItem>
      );
    });
  };

  const handleMainLinkClick = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  return (
    <Box className="service-container" p={10} bgGradient="linear(to right, rgba(255,255,255,0.6), rgba(255,255,255,0.5))" bgSize="cover" bgImage="url('../img/hotel-interior.jpg')">
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap">
    <Heading as="h3" fontSize="4xl" fontFamily="Lobster" whiteSpace="nowrap" ml={100}>
      Services
</Heading>
  <Box display="flex" alignItems="center">
    <Input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search..."
      mr={2}
      borderRadius="md"
    />
    <Button colorScheme="teal" onClick={handleSearch}>
      <FontAwesomeIcon icon={faSearch} />
    </Button>
  </Box>
</Box>
      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6} justifyItems="center">
      {categories.map((category) => (
      <React.Fragment key={category}>
       <Button
      onClick={() => handleMainLinkClick(category)}
      variant={selectedCategory === category ? 'solid' : 'outline'}
      fontSize="xl"
       >
       {category}
    </Button>
       {renderSubcategories(category)}
      </React.Fragment>
   ))}
      </Grid>
      <Box mt={6} display="grid" gridTemplateColumns="repeat(3, 1fr)" gridGap={6} justifyContent="center">
  <Box position="relative">
    <Button colorScheme="teal" className="sort-button">
      Sort by Cost
    </Button>
    <Box
      position="relative"
      display={sortBy ? 'block' : 'none'}
      backgroundColor="#f9f9f9"
      minWidth="160px"
      boxShadow="md"
      zIndex="1"
      padding="10px"
      borderRadius="md"
      mt={2}
    >
  <Button
    onClick={() => handleSortByCost('lowest')}
    variant={sortBy === 'lowest' ? 'solid' : 'ghost'}
    mb={2}
    w="100%"
  >
    Lowest to Highest
  </Button>
  <Button
    onClick={() => handleSortByCost('highest')}
    variant={sortBy === 'highest' ? 'solid' : 'ghost'}
    w="100%"
  >
    Highest to Lowest
  </Button>
    </Box>
  </Box>
</Box>
      <Grid className="data-container" templateColumns="repeat(3, 1fr)" gap={6} justifyItems="center">
        {renderServices()}
      </Grid>
      {showPopup && selectedService && (
        <AlertDialog isOpen={showPopup} onClose={() => setShowPopup(false)}>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>Confirm Service</AlertDialogHeader>
            <AlertDialogBody>
              <Image src={selectedService.image_url} alt={selectedService.service_name} boxSize="100%" objectFit="contain" mb={4} />
              <Heading as="h1" fontSize="xl" mb={2}>
                {selectedService.service_name}
              </Heading>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                {selectedService.service_cost}
              </Text>
              <Text fontSize="md" mb={4}>
                {selectedService.service_description}
              </Text>
              {!loading ? (
                <Button colorScheme="teal" onClick={handleConfirmService}>
                  Confirm Service
                </Button>
              ) : (
                <Center mt={4}>
                  <Spinner color="teal" size="lg" />
                </Center>
              )}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={() => setShowPopup(false)}>Close</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {confirmedService && (
        <AlertDialog isOpen={Boolean(confirmedService)} onClose={() => setConfirmedService(null)}>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>Service Booked</AlertDialogHeader>
            <AlertDialogBody>Your service has been successfully booked!</AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="teal" onClick={() => setConfirmedService(null)}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </Box>
  );
};

export default Service;
