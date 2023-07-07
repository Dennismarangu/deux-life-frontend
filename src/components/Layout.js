import React from 'react';
import { Container } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <Container maxW="container.lg">
      <main>{children}</main>
    </Container>
  );
};

export default Layout;
