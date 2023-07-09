import React from 'react';
import { ChakraProvider, Box, Heading, Container, VStack } from '@chakra-ui/react';
import RoomList from './components/RoomList';
import MyBookings from './components/MyBookings';

function App() {
  return (
    <ChakraProvider>
      <Box bg="gray.100" minH="100vh" py={8}>
        <Container maxW="xl">
          <VStack spacing={6} align="stretch">
            <Heading as="h1" size="xl" textAlign="center">
              Room List
            </Heading>
            <RoomList />
            <MyBookings />
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
