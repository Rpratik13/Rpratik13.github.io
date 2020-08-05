import * as repositoryActions from '../actions/repositoryActions';


const INITIAL_STATE = {
  filter_language : '',
  repositories    : [],
  search          : '',
  forked_repos    : {},
};

function repositoryReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case repositoryActions.SET_REPOSITORIES:
      return {
        ...state,
        repositories : action.payload,
      };
    
    case repositoryActions.ADD_FORKED_REPOS:
      return {
        ...state,
        forked_repos : {...state.forked_repos, ...action.payload}
      }
    default:
      return state;
  }
}

export default repositoryReducer;