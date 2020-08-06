import * as followersActions from '../actions/followersActions';


const INITIAL_STATE = {
  followers  : [],
  followerIsLoading : true,
};

function followersReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case followersActions.ADD_FOLLOWER:
      return {
        ...state,
        followers : [...state.followers, action.payload],
      };
    
    case followersActions.SET_FOLLOWER_LOADING:
      return {
        ...state,
        followerIsLoading : action.payload
      }
      
    default:
      return state;
  }
}

export default followersReducer;