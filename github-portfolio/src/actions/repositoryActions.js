export const SET_REPOSITORIES = 'SET_REPOSITORIES';
export const ADD_FORKED_REPOS = 'ADD_FORKED_REPOS';
export const SET_REPO_LOADING = 'SET_REPO_LOADING';
export const CHANGE_PAGE      = 'CHANGE_PAGE';
export const RESET_PAGE       = 'RESET_PAGE';

export const setRepositories = repositories => ({
  payload : repositories,
  type    : SET_REPOSITORIES,
});

export const addForkedRepos = repoObj => ({
  payload : repoObj,
  type    : ADD_FORKED_REPOS,
});

export const setRepoLoading = val => ({
  payload : val,
  type    : SET_REPO_LOADING,
});

export const changePage = change => ({
  payload : change,
  type    : CHANGE_PAGE,
});

export const resetPage = () => ({
  payload : 1,
  type    : RESET_PAGE,
});