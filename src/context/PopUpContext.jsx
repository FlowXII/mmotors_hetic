import React, { createContext, useState } from 'react';

export const PopUpContext = createContext();

export const PopUpProvider = ({ children }) => {
  const [popUpStatus, setPopUpStatus] = useState(undefined);

  return (
    <PopUpContext.Provider value={{ popUpStatus, setPopUpStatus }}>
      {children}
    </PopUpContext.Provider>
  );
};