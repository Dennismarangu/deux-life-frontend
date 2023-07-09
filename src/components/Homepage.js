import React from 'react';
import { Box, Image, Flex } from '@chakra-ui/react';
import { NavBar } from './NavBar';
import { Header } from './Header';

export function Homepage() {
  return (
    <>
      <Box>
        <Flex position="fixed" top={0} left={0} right={0} justifyContent="center" zIndex="999">
          <nav>
            <Header />
          </nav>
        </Flex>
      </Box>

      <Box
        bgImage={require('../images/background.jpg')}
        bgSize="cover"
        bgPosition="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box width="300px" height="200px" display="flex" flexDirection="column" justifyContent="center" textAlign="center">
          <Image src={require('../images/logo.png')} alt="Hotel Logo" height="1920px" width="1080px" />
          <nav>
            <NavBar />
          </nav>
        </Box>
      </Box>
    </>
  );
}

export default Homepage;
