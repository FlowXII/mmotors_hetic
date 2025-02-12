import React, { createContext, useState, useContext } from 'react';

const VehicleContext = createContext();

export function VehicleProvider({ children }) {
  const [vehicles, setVehicles] = useState([]);

  return (
    <VehicleContext.Provider value={{ vehicles, setVehicles }}>
      {children}
    </VehicleContext.Provider>
  );
}

export function useVehicle() {
  return useContext(VehicleContext);
}