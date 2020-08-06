export const ADD_FOLLOWER = 'ADD_FOLLOWER';
export const SET_FOLLOWER_LOADING = 'SET_FOLLOWER_LOADING';

export const addFollower = follower => ({
  payload : follower,
  type    : ADD_FOLLOWER,
});

export const setLoading = val => ({
  payload : val,
  type    : SET_FOLLOWER_LOADING,
})

