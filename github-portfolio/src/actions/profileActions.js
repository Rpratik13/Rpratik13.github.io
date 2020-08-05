export const SET_PROFILE = 'SET_PROFILE';

export const setProfile = userData => ({
  payload : userData,
  type    : SET_PROFILE,
});