import { NavLink } from "react-router-dom";
import React from "react";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";

export function NavBar() {
  return (
    <nav>
      <Box as="div" display="flex" flexDirection="column" padding="20px">
        <NavLink to="/book" className="link">
          <Flex align="center">
            <Icon as={ArrowRightIcon} boxSize={4} mr={2} />
            Book a room with us today!
          </Flex>
        </NavLink>
        <NavLink to="/request" className="link">
          <Flex align="center">
            <Icon as={ArrowRightIcon} boxSize={4} mr={2} />
            Request one of our exclusive services today!
          </Flex>
        </NavLink>
      </Box>
    </nav>
  );
}