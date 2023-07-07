import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Heading, Container, VStack } from '@chakra-ui/react';
import BookingForm from './components/BookingForm';

import Service from './components/Service';
import ServiceContextProvider from './context/ServiceContext';

function App() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  // Fetch rooms data from the backend using an API request
  useEffect(() => {
    fetch('http://localhost:3000/rooms')
      .then(response => response.json())
      .then(data => setRooms(data))
      .catch(error => console.error('Error fetching rooms:', error));
  }, []);

  return (
    <ChakraProvider>
          <ServiceContextProvider>
             <Service />
          </ServiceContextProvider>
    
      <Box bg="gray.100" minH="100vh" py={8}>
        <Container maxW="xl">
          <VStack spacing={6}>
            <Heading as="h1" size="xl">Room List</Heading>
            {rooms.map((room) => (
              <Box
                key={room.id}
                onClick={() => handleRoomClick(room)}
                className="room-item"
                p={4}
                boxShadow="md"
                borderRadius="md"
                cursor="pointer"
              >
                <Heading as="h3" size="md" mb={2}>
                  {room.room_name}
                </Heading>
                <Box>{room.room_description}</Box>
                <Box>Capacity: {room.room_capacity}</Box>
                <Box>Price: {room.room_price}</Box>
              </Box>
            ))}
            {selectedRoom && <BookingForm room={selectedRoom} />}
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
