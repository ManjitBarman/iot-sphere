
/**
 * Example of how to use the zsee IoT theme in a Chakra UI project
 */

// 1. Import necessary dependencies
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import zseeTheme from './theme';

// 2. Import your app or component
import App from './App';

// 3. Wrap your application with ChakraProvider and pass the theme
function ThemeProvider() {
  return (
    <ChakraProvider theme={zseeTheme}>
      <App />
    </ChakraProvider>
  );
}

export default ThemeProvider;

// 4. Using theme colors in components:
// 
// import { Box, Button, Text } from '@chakra-ui/react';
// 
// function ExampleComponent() {
//   return (
//     <Box bg="brand.primary" p={4} color="white">
//       <Text>Using theme colors</Text>
//       <Button variant="outline">Brand Button</Button>
//       <Button variant="danger" ml={2}>Danger Button</Button>
//     </Box>
//   );
// }
