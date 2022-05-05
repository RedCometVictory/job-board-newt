import React, { createContext, useContext, useReducer, useEffect, useMemo } from "react";
import { Reducer, initialState } from './Reducer';

const Store = createContext();

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch]);

  // check if state exists in LS
  useEffect(() => {
      if (JSON.parse(localStorage.getItem("nwt___state"))) {
        dispatch({
          type: "SET_INIT",
          value: JSON.parse(localStorage.getItem("nwt__state"))
        });
      }
    }, []
  );

  useEffect(() => {
    // create LS value as state
    if (state !== initialState) {
      localStorage.setItem("nwt__state", JSON.stringify(state));
    }
  }, [state]);

  return (
    // <Store.Provider value={{state, dispatch}}>
    <Store.Provider value={contextValue}>
      {children}
    </Store.Provider>
  )
};
// export default StoreProvider;
export function useAppContext() {
  return useContext(Store);
};