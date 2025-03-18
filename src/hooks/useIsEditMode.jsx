import { createContext, useContext } from "react";

export const EditModeContext = createContext();

export const useIsEditMode = () => {
  return useContext(EditModeContext);
};
