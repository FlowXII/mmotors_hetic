import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'; // ChakraProvider do Chakra UI
import App from './App'; // Componente principal da aplicação

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>  {/* Chakra UI envolvente */}
    <App />
  </ChakraProvider>
);