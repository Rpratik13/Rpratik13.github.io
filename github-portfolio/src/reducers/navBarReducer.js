import * as navBarActions from '../actions/navBarActions';


const INITIAL_STATE = {
  isSelected : 'repositories'
};

function navBarReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case navBarActions.SET_TAB:
      return {
        ...state,
        isSelected : action.payload,
      };

    default:
      return state;
  }
}

export default navBarReducer;