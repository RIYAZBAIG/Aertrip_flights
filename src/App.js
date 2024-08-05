import React from 'react';
import Header from './components/Header';
import FlightSearch from './components/FlightSearch';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <FlightSearch />
    </div>
  );
};

export default App;
