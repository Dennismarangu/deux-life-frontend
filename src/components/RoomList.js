import React, { useState } from 'react';
import { Box, Heading, Image } from '@chakra-ui/react';
import BookingForm from './BookingForm';

const RoomList = ({ rooms }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
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
          <Box>Capacity: {room.room_capacity}</Box>
          <Box>Price: {room.room_price}</Box>
        </Box>
      ))}
      {selectedRoom && <BookingForm room={selectedRoom} />}
    </Box>
  );
};

export default RoomList;
