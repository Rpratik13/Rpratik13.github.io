export const SET_FOLLOWING_LOADING = 'SET_FOLLOWING_LOADING';
export const ADD_FOLLOWING = 'ADD_FOLLOWING';

export const setFollowingLoading = val => ({
  payload : val,
  type    : SET_FOLLOWING_LOADING,
})

export const addFollowing = user => ({
  payload : user,
  type    : ADD_FOLLOWING
});