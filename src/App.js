import * as React from 'react';
import Service from './components/Service';
import ServiceContextProvider from './context/ServiceContext';

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
          <ServiceContextProvider>
             <Service />
          </ServiceContextProvider>
    </ChakraProvider>
  )
}

export default App;
