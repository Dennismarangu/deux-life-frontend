import React, { useState, useEffect } from 'react';
import { Box, Heading, Button } from '@chakra-ui/react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings data from the backend API
    fetch('http://localhost:3000/bookings')
      .then(response => response.json())
      .then(data => setBookings(data))
      .catch(error => console.error('Error fetching bookings:', error));
  }, []);

  const handleDeleteBooking = (bookingId) => {
    fetch(`http://localhost:3000/bookings/${bookingId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Remove the deleted booking from the local state
          setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
        }
      })
      .catch(error => console.error('Error deleting booking:', error));
  };

  return (
    <Box>
      <Heading as="h1" size="xl" mb={4}>
        My Bookings
      </Heading>
      {bookings.map(booking => (
        <Box key={booking.id} p={4} boxShadow="md" borderRadius="md" mb={4}>
          <Heading as="h3" size="md" mb={2}>
            {booking.room_name}
          </Heading>
          <Box>{booking.check_in_date} to {booking.check_out_date}</Box>
          <Button mt={4} colorScheme="red" onClick={() => handleDeleteBooking(booking.id)}>
            Delete Booking
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default MyBookings;
