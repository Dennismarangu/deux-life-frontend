import { NavLink } from "react-router-dom";
import React from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";

export function NavBar() {
  return (
    <nav>
      <Box
      as="div"
      display="flex"
      flexDirection="column"
      padding="20px"
      fontWeight="bold"
      textColor="black"
      fontSize="xl"
    >
      <NavLink
        to="/book"
        className="link"
      >
        <Flex align="center" _hover={{ color: 'black'}}>
          <ArrowRightIcon boxSize={4} mr={2} />
            <Button backgroundColor="transparent" variant='solid' margin="5px" size="sm" fontWeight="bold" color="black" padding="10px" borderRadius="10px" _hover={{ color: 'rgb(255,215,0)'}} fontSize="xl">
              Book a room with us today!
            </Button>
        </Flex>
      </NavLink>

      <NavLink
        to="/service"
        className="link"
      >
        <Flex align="center">
          <ArrowRightIcon boxSize={4} mr={2} />
            <Button backgroundColor="transparent" variant='solid' margin="5px" size="sm" fontWeight="bold" color="black" padding="10px" borderRadius="10px" _hover={{ color: 'rgb(255,255,0)'}} fontSize="xl">
              Request one of our exclusive services today!
            </Button>
        </Flex>
      </NavLink>
    </Box>
    </nav>
  );
}