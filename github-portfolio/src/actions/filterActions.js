export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_SEARCH   = 'SET_SEARCH';
export const SET_TYPE     = 'SET_TYPE';
export const ADD_LANGUAGE = 'ADD_LANGAUGE';


export const setLanguage = language => ({
  payload : language,
  type    : SET_LANGUAGE,
});

export const setSearch = search => ({
  payload : search,
  type    : SET_SEARCH,
});

export const setType = type => ({
  payload : type,
  type    : SET_TYPE,
});

export const addLanguage = language => ({
  payload : language,
  type    : ADD_LANGUAGE,
});