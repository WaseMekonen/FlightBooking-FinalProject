import actions from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_RADIO:
      return {
        ...state,
        radio: action.payload,
      };
    case actions.SET_AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    case actions.SET_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
      };
    case actions.SET_SEARCH_INPUTS:
      return {
        ...state,
        searchInputs: { ...state.searchInputs, ...action.payload },
      };
    case actions.SET_ONE_WAY_TICKETS:
      return {
        ...state,
        oneWayTickets: action.payload,
      };
    case actions.SET_ROUND_TRIP_TICKETS:
      return {
        ...state,
        roundTripTickets: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
