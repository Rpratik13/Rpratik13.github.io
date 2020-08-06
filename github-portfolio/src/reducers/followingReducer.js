import * as followingActions from '../actions/followingActions';


const INITIAL_STATE = {
  following  : [],
  followingIsLoading : true,
};

function followingReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case followingActions.SET_FOLLOWING_LOADING:
      return {
        ...state,
        followingIsLoading : action.payload
      }

    case followingActions.ADD_FOLLOWING:
      return {
        ...state,
        following : [...state.following, action.payload]
      }

    default:
      return state;
  }
}

export default followingReducer;