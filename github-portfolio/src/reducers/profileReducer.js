import * as profileActions from '../actions/profileActions';


const INITIAL_STATE = {
  userData  : {},
  isLoading : true,
};

function profileReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case profileActions.SET_PROFILE:
      return {
        ...state,
        userData : action.payload,
      };
    
    case profileActions.SET_LOADING:
      return {
        ...state,
        isLoading : action.payload
      }

    default:
      return state;
  }
}

export default profileReducer;