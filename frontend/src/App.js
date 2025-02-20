import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import AdminCard from './components/AdminCard'; 

function App() {
  return (
    <ChakraProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <Link to="/admin" className="App-link">
              Go to Admin
            </Link>
          </header>
          <Routes>
            <Route path="/admin" element={<AdminCard selectedTab="example" items={[]} loading={false} error={null} addItem={() => {}} editItem={() => {}} removeItem={() => {}} />} />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;