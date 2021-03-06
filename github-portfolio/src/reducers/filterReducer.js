import * as filterActions from '../actions/filterActions';


const INITIAL_STATE = {
  filter_language : '',
  languages       : [],
  search          : '',
  type            : '',
};

function filterReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case filterActions.SET_LANGUAGE:
      return {
        ...state,
        filter_language : action.payload,
      };

    case filterActions.SET_SEARCH:
      return {
        ...state,
        search : action.payload,
      };

    case filterActions.SET_TYPE:
      return {
        ...state,
          type : action.payload,
      };

    case filterActions.RESET_FILTER:
      return {
        ...state,
        search : '',
        type   : '',
        filter_language : '',
      }

    default:
      return state;
  }
}

export default filterReducer;