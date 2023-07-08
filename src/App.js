import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Homepage } from './components/Homepage';
import { Box, Container, VStack, Heading } from '@chakra-ui/react';
import { BookingForm } from './components/BookingForm';

import Service from './components/Service';
import ServiceContextProvider from './context/ServiceContext';



function App() {
  const [selectedRoom, setSelectedRoom] = React.useState(null);

  const rooms = [
    { id: 1, room_name: 'Room 1', room_description: 'Description 1', room_capacity: 2, room_price: 100 },
    { id: 2, room_name: 'Room 2', room_description: 'Description 2', room_capacity: 4, room_price: 200 },
    // Add more rooms as needed
  ];

  const handleRoomClick = (room) => {
    // Implement the logic for handling room click
  };


  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/service" element={
          <ServiceContextProvider>
             <Service />
        </ServiceContextProvider>} />


        <Route path="/book" element={<Box bg="gray.100" minH="100vh" py={8}>
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
      </Box>} />
      </Routes>
    </>
  );
}

export default App;
