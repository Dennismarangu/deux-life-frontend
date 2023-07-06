import { Box, Flex } from '@chakra-ui/react';
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Homepage } from './components/Homepage';

function App() {
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
        <Route path="/" element={<Homepage />}/>
      </Routes>
    </>
  );
}

export default App;
