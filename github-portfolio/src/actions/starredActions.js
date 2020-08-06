export const CHANGE_STARRED_PAGE = 'CHANGE_STARRED_PAGE';
export const SET_STARRED_LOADING = 'SET_STARRED_LOADING';
export const SET_STARRED = 'SET_STARRED';

export const setStarred = repositories => ({
  payload : repositories,
  type    : SET_STARRED,
});

export const setStarredLoading = val => ({
  payload : val,
  type    : SET_STARRED_LOADING,
});

export const changeStarredPage = change => ({
  payload : change,
  type    : CHANGE_STARRED_PAGE,
});
