import * as profileActions from '../actions/profileActions';


const INITIAL_STATE = {
  userData : {}
};

function profileReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case profileActions.SET_PROFILE:
      return {
        ...state,
        userData : action.payload,
      };

    default:
      return state;
  }
}

export default profileReducer;