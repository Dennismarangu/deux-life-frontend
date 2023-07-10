import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Heading, Container, VStack } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from './components/Homepage';
import Service from './components/Service';
import ServiceContextProvider from './context/ServiceContext';
import RoomList from './components/RoomList';
import MyBookings from './components/MyBookings';
import Login from './components/Auth/Login';
import Profile from './components/Profile';

function App() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  // Fetch rooms data from the backend using an API request
  useEffect(() => {
    fetch('http://localhost:3000/rooms')
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) => console.error('Error fetching rooms:', error));
  }, []);

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/service"
            element={
              <ServiceContextProvider>
                <Service />
              </ServiceContextProvider>
            }
          />
          <Route
            path="/book"
            element={
              <Box bg="gray.100" minH="100vh" py={8}>
                <Container maxW="xl">
                  <VStack spacing={6} align="stretch">
                    <Heading as="h1" size="xl" textAlign="center">
                      Room List
                    </Heading>
                    <RoomList
                      rooms={rooms}
                      selectedRoom={selectedRoom}
                      onRoomClick={handleRoomClick}
                    />
                    <MyBookings selectedRoom={selectedRoom} />
                  </VStack>
                </Container>
              </Box>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
