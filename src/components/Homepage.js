import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { NavBar } from './NavBar';

export function Homepage () {
    const [page, setPage] = useState("/");

    return (
        <Box
            bgImage={require('../images/background.jpg')}
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
    )
}