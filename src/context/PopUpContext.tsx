import React, { createContext, useState } from 'react';

export const PopUpContext = createContext({
  popUpStatus: undefined,
  setPopUpStatus: (status: any) => {},
});

export const PopUpProvider = ({ children } : 
  { children: React.ReactNode }
) => {
  const [popUpStatus, setPopUpStatus] = useState(undefined);

  return (
    <PopUpContext.Provider value={{ popUpStatus, setPopUpStatus }}>
      {children}
    </PopUpContext.Provider>
  );
};