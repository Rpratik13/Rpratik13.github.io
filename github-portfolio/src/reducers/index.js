import { combineReducers } from 'redux';

import filterReducer from './filterReducer';
import profileReducer from './profileReducer';
import repositoryReducer from './repositoryReducer';

const reducer = combineReducers({
  filter     : filterReducer,
  profile    : profileReducer,
  repository : repositoryReducer,
});

export default reducer;