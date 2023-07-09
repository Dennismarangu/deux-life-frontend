
import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Heading, Container, VStack } from '@chakra-ui/react';
import BookingForm from './components/BookingForm';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Import the Layout component
import { Login as LoginPage } from './components/Auth/Login'
import { Signup as Register } from './components/Auth/Register'
import Profile from './components/Auth/Profile';
import { Homepage } from './components/Homepage';
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
    <>
      <Routes>
       	<Route path="/" element={<Layout>Home</Layout>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/" element={<Homepage />}/>
        <Route path="/service" element={
          <ServiceContextProvider>
             <Service />
        </ServiceContextProvider>} />


        <Route path="/book" element={<Box bg="gray.100" minH="100vh" py={8}>
        <Container maxW="xl">
          <VStack spacing={6} align="stretch">
            <Heading as="h1" size="xl" textAlign="center">
              Room List
            </Heading>
            <RoomList />
            <MyBookings />
          </VStack>
        </Container>
      </Box>} />
      </Routes>
    </>
  );
}

export default App;
