import React, { createContext, useState } from 'react';

type PopUpStatus = "login" | "register" | "reservation" | undefined;

interface PopUpContextType {
  popUpStatus: PopUpStatus;
  setPopUpStatus: (status: PopUpStatus) => void;
}

export const PopUpContext = createContext<PopUpContextType>({
  popUpStatus: undefined,
  setPopUpStatus: () => {},
});

export const PopUpProvider = ({ children }: { children: React.ReactNode }) => {
  const [popUpStatus, setPopUpStatus] = useState<PopUpStatus>(undefined);

  return (
    <PopUpContext.Provider value={{ popUpStatus, setPopUpStatus }}>
      {children}
    </PopUpContext.Provider>
  );
};
