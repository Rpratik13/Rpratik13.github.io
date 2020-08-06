import * as starredActions from '../actions/starredActions';


const INITIAL_STATE = {
  starredIsLoading    : true,
  starredPageNum      : 1,
  repositories : [],
};

function starredReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case starredActions.SET_STARRED:
      return {
        ...state,
        repositories : action.payload,
      };
    
    case starredActions.SET_STARRED_LOADING: 
      return {
        ...state,
        starredIsLoading : action.payload
      }

    case starredActions.CHANGE_STARRED_PAGE:
      return {
        ...state,
        starredPageNum : (state.starredPageNum + action.payload),
      }
      
    default:
      return state;
  }
}

export default starredReducer;