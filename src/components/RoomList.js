import React, { useState, useEffect } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import BookingForm from './BookingForm';

const RoomList = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch room data from the backend API
    fetch('http://localhost:3000/rooms')
      .then(response => response.json())
      .then(data => setRooms(data))
      .catch(error => console.error('Error fetching room data:', error));
  }, []);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  const handleBookingSubmit = (values) => {
    // Make a POST request to the backend with the form data (values)
    fetch('http://localhost:3000/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server (optional)
        console.log(data); // You can customize this based on your requirements
        // Display a visual confirmation of the successful booking
        alert('Booking successful!');
        // Reset the selected room
        setSelectedRoom(null);
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle errors if necessary
      });
  };

  return (
    <Box>
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
          <Box>Is Booked: {room.is_booked ? 'Yes' : 'No'}</Box>
          <Box>Price: {room.room_price}</Box>
        </Box>
      ))}
      {selectedRoom && <BookingForm room={selectedRoom} onBookingSubmit={handleBookingSubmit} />}
    </Box>
  );
};

export default RoomList;


