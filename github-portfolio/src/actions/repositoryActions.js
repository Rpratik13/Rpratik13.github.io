export const SET_REPOSITORIES = 'SET_REPOSITORIES';
export const ADD_FORKED_REPOS = 'ADD_FORKED_REPOS';

export const setRepositories = repositories => ({
  payload : repositories,
  type    : SET_REPOSITORIES,
});

export const addForkedRepos = repoObj => ({
  payload : repoObj,
  type    : ADD_FORKED_REPOS,
});