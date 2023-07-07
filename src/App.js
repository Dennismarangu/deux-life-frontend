import  React from 'react'
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Import the Layout component
import { Login as LoginPage } from './components/Auth/Login'
import { Signup as Register } from './components/Auth/Register'
import Profile from './components/Auth/Profile';
import { Homepage } from './components/Homepage';
import Service from './components/Service';
import ServiceContextProvider from './context/ServiceContext';

function App() {
  return (
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
