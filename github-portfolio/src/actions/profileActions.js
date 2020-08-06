export const SET_PROFILE = 'SET_PROFILE';
export const SET_LOADING = 'SET_LOADING';

export const setProfile = userData => ({
  payload : userData,
  type    : SET_PROFILE,
});

export const setLoading = val => ({
  payload : val,
  type    : SET_LOADING,
})