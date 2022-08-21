import React, { createContext, useReducer } from "react";
import reducer from "../../Hooks/context/reducer";
import initialState from "../../Hooks/context/initialState";
import actions from "../../Hooks/context/actions";

export const AppContext = createContext();

const ProviderWrapper = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    ...state,
    setRadio: (payload) => {
      dispatch({ type: actions.SET_RADIO, payload });
    },
    setOneWayTickets: (payload) => {
      dispatch({ type: actions.SET_ONE_WAY_TICKETS, payload });
    },
    setRoundTripTickets: (payload) => {
      dispatch({ type: actions.SET_ROUND_TRIP_TICKETS, payload });
    },
    setAuth: (payload) => {
      dispatch({ type: actions.SET_AUTH, payload });
    },
    setResults: (payload) => {
      dispatch({ type: actions.SET_RESULTS, payload });
    },
    setSearchInputs: (payload) => {
      dispatch({ type: actions.SET_SEARCH_INPUTS, payload });
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default ProviderWrapper;
