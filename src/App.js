import { Box } from '@chakra-ui/react';
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { NavBar } from './components/NavBar';

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <>
      <Routes>
        <Route path="/" element={
          <Box
            bgImage={"url('/src/images/background.jpg')"}
            bgSize="cover"
            bgPosition="center"
            minHeight="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box width="300px" height="200px" display="flex" flexDirection="column" justifyContent="center">
              <Box alignSelf="flex-start" ml={4}>
                <nav>
                  <NavBar onChangePage={setPage} />
                </nav>
              </Box>
            </Box>
          </Box>
        }/>
      </Routes>
    </>
  );
}

export default App;
