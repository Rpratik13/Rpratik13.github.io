import { combineReducers } from 'redux';

import filterReducer from './filterReducer';
import profileReducer from './profileReducer';
import repositoryReducer from './repositoryReducer';
import navBarReducer from './navBarReducer';
import starredReducer from './starredReducer';
import followersReducer from './followersReducer';
import followingReducer from './followingReducer';

const reducer = combineReducers({
  filter     : filterReducer,
  profile    : profileReducer,
  repository : repositoryReducer,
  navBar     : navBarReducer,
  starred    : starredReducer,
  follower   : followersReducer,
  following  : followingReducer,
});

export default reducer;