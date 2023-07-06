import { Box, Flex } from '@chakra-ui/react';
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { NavBar } from './components/NavBar';
import { Header } from './components/Header';

function App() {
  const [page, setPage] = useState("/");
  return (
    <>
      <Box>
        <Flex position="fixed" top={0} left={0} right={0} justifyContent="center" zIndex="999">
          <nav>
            <Header />
          </nav>
        </Flex>
      </Box>        

      <Routes>
        <Route path="/" element={
          <Box
            bgImage={require('./images/background.jpg')}
            bgSize="cover"
            bgPosition="center"
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            // style={{
            //   backgroundImage: '/images/background.jpg'
            // }}
        >
          <Box width="300px" height="200px" display="flex" flexDirection="column" justifyContent="center" textAlign="center">
            <nav>
              <NavBar onChangePage={setPage} />
            </nav>
          </Box>
        </Box>
        }/>
      </Routes>
    </>
  );
}

export default App;
