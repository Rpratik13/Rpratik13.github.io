import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as profileActions from '../actions/profileActions';

import '../styles/profile.css';
import { get } from '../Utils/https.js';

function showBio(props) {
  if (props.userData.bio){
    return (
            <div className = "user-bio">
              {props.userData.bio}
            </div>
            );
  }
}

function showFollowers(props) {
  return (
         <div className="follow-data clearfix">
          <div className="followers">
            <div className="icon">
            <svg text="gray-light" 
                 height="16" 
                 viewBox="0 0 16 16" 
                 version="1.1" 
                 width="16" 
                 aria-hidden="true"
            >
              <path fillRule="evenodd" 
                    d="M5.5 3.5a2 2 0 100 4 2 2 0 
                    000-4zM2 5.5a3.5 3.5 0 115.898 
                    2.549 5.507 5.507 0 013.034 
                    4.084.75.75 0 11-1.482.235 
                    4.001 4.001 0 00-7.9 0 .75.75 
                    0 01-1.482-.236A5.507 5.507 0 
                    013.102 8.05 3.49 3.49 0 012 
                    5.5zM11 4a.75.75 0 100 1.5 1.5 
                    1.5 0 01.666 2.844.75.75 0 
                    00-.416.672v.352a.75.75 0 
                    00.574.73c1.2.289 2.162 1.2 2.522 
                    2.372a.75.75 0 101.434-.44 5.01 
                    5.01 0 00-2.56-3.012A3 3 0 0011 4z"
              />
            </svg>
            </div>
            <div className="data">
              <strong>{' ' + props.userData.followers}</strong>{' followers'}
            </div>
          </div>
          <div className="dot">·</div>
          <div className="following data"><strong>{props.userData.following}</strong>{' following'}</div>
          <div className="dot">·</div>
          <div className = "stars">
            <div className = "icon">
            <svg text="gray-light" 
                 height="16"  
                 viewBox="0 0 16 16" 
                 version="1.1" 
                 width="16" 
                 aria-hidden="true"
            >
              <path fillRule="evenodd" 
                    d="M8 .25a.75.75 0 01.673.418l1.882 
                       3.815 4.21.612a.75.75 0 01.416 
                       1.279l-3.046 2.97.719 4.192a.75.75 
                       0 01-1.088.791L8 12.347l-3.766 
                       1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 
                       6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 
                       0 018 .25zm0 2.445L6.615 5.5a.75.75 0 
                       01-.564.41l-3.097.45 2.24 2.184a.75.75 0 
                       01.216.664l-.528 3.084 2.769-1.456a.75.75 
                       0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 
                       01.216-.664l2.24-2.183-3.096-.45a.75.75 0 
                       01-.564-.41L8 2.694v.001z"
              />
            </svg>
          </div>
         </div>
         </div>
  )
}

function showCompany(props) {
  if (props.userData.company){
    return (
           <div className="link clearfix">
             <div className="link-icon">
           <svg viewBox="0 0 16 16" 
                version="1.1" 
                width="16" 
                height="16" 
                aria-hidden="true"
            >
              <path fillRule="evenodd" 
                    d="M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 
                       0 01.75-.75h2.5a.75.75 0 01.75.75v1.25h2.25a.25.25 
                       0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 
                       00-.25.25v12.5zM1.75 16A1.75 1.75 0 010 14.25V1.75C0 
                       .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 
                       .085-.006.168-.018.25h2.268a.25.25 0 00.25-.25V8.285a.25.25 
                       0 00-.111-.208l-1.055-.703a.75.75 0 
                       11.832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 
                       1.75 0 0114.25 16h-3.5a.75.75 0 01-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 
                       0 01-.75-.75V14h-1v1.25a.75.75 0 01-.75.75h-3zM3 3.75A.75.75 0 013.75 3h.5a.75.75 
                       0 010 1.5h-.5A.75.75 0 013 3.75zM3.75 6a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM3 
                       9.75A.75.75 0 013.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 9.75zM7.75 9a.75.75 
                       0 000 1.5h.5a.75.75 0 000-1.5h-.5zM7 6.75A.75.75 0 017.75 6h.5a.75.75 0 010 
                       1.5h-.5A.75.75 0 017 6.75zM7.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z" 
              />
            </svg>
            </div>
            <div className="link-text">
              {props.userData.company}
            </div>
           </div>
           )
  }
}

function showLocation(props) {
  if (props.userData.location){
    return (
           <div className="link clearfix">
             <div className="link-icon">
           <svg viewBox="0 0 16 16" 
                version="1.1" 
                width="16" 
                height="16" 
                aria-hidden="true"
            >
              <path fillRule="evenodd" 
                    d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 
                       0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 
                       3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z" 
              />
            </svg>
            </div>
            <div className="link-text">
            {props.userData.location}
            </div>
           </div>
           )
  }
}

function showWebsite(props) {
  if (props.userData.blog){
    return (
           <div className="link clearfix">
             <div className="link-icon">
           <svg viewBox="0 0 16 16" 
                version="1.1" 
                width="16" 
                height="16" 
                aria-hidden="true"
            >
              <path fillRule="evenodd" 
                    d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 
                       2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 
                       3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 
                       1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 
                       .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 
                       3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 
                       1.25a2 2 0 01-2.83 0z" 
              />
            </svg>
            </div>
            <div className="blog link-text">
              {props.userData.blog}
            </div>
           </div>
           )
  }
}

function showTwitter(props) {
  if (props.userData.twitter_username){
    return (
           <div className="link">
             <div className="link-icon">
           <svg viewBox="0 0 273.5 222.3"
                className="twitter-icon" 
            >
              <path fillRule="evenodd" 
                    d="M273.5 26.3a109.77 109.77 0 0 1-32.2 8.8 56.07 56.07 0 0 0 24.7-31 113.39 113.39 0 0 1-35.7 13.6 56.1 56.1 0 0 0-97 38.4 54 54 0 0 0 1.5 12.8A159.68 159.68 0 0 1 19.1 10.3a56.12 56.12 0 0 0 17.4 74.9 56.06 56.06 0 0 1-25.4-7v.7a56.11 56.11 0 0 0 45 55 55.65 55.65 0 0 1-14.8 2 62.39 62.39 0 0 1-10.6-1 56.24 56.24 0 0 0 52.4 39 112.87 112.87 0 0 1-69.7 24 119 119 0 0 1-13.4-.8 158.83 158.83 0 0 0 86 25.2c103.2 0 159.6-85.5 159.6-159.6 0-2.4-.1-4.9-.2-7.3a114.25 114.25 0 0 0 28.1-29.1" 
              />
            </svg>
            </div>
            <div className="twitter link-text">
              {'@' + props.userData.twitter_username}
            </div>
           </div>
           )
  }
}

function Profile(props) {
  useEffect(() => {
    get('users/Rpratik13')
    .then(response => response.json())
    .then(userData => {
      props.setProfile(userData)
      props.setLoading(false);
    });

  }, []);

  return (
          <div className = "profile">
            {console.log(props.isLoading)}
            {props.isLoading && <div className="loading profile-loading"></div>}
            {!props.isLoading && <div>
            <div className = "avatar">
              <img 
                alt = "Avatar" 
                src = {props.userData.avatar_url} 
              />
            </div>
            <div className = "name">
              {props.userData.name}
            </div>
            <div className = "user-name">
              {props.userData.login}
            </div>
            {showBio(props)}
            <button className="profile-edit">Edit Profile</button><br />
            {showFollowers(props)}
            {showCompany(props)}
            {showLocation(props)}
            {showWebsite(props)}
            {showTwitter(props)}
            </div>}
          </div>
         );
}

function mapStateToProps(state) {
  return {
    userData : state.profile.userData,
    isLoading : state.profile.isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setProfile: userData => {
      dispatch(profileActions.setProfile(userData));
    },

    setLoading: val => {
      dispatch(profileActions.setLoading(val));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);