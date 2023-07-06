import { Box } from '@chakra-ui/react';
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Homepage } from './components/Homepage';

function App() {
  return (
    <>
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
