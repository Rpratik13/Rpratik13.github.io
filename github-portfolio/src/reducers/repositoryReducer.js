import * as repositoryActions from '../actions/repositoryActions';


const INITIAL_STATE = {
  filter_language : '',
  repositories    : [],
  search          : '',
  forked_repos    : {},
  repoIsLoading       : true,
  pageNum         : 1,
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

    case repositoryActions.SET_REPO_LOADING: 
      return {
        ...state,
        repoIsLoading : action.payload
      }

    case repositoryActions.CHANGE_PAGE:
      return {
        ...state,
        pageNum : (state.pageNum + action.payload),
      }
    
    case repositoryActions.RESET_PAGE:
      return {
        ...state,
        pageNum : action.payload
      }

    case repositoryActions.CLEAR_SEARCH:
      return {
        ...state,
        search : '',
      }
      
    default:
      return state;
  }
}

export default repositoryReducer;