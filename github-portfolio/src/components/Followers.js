import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as followersActions from '../actions/followersActions';

import '../styles/follower.css';
import { get } from '../Utils/https.js';

function showBio(follower) {
  if (follower.bio){
    return (
            <div className = "follower-bio">
              {follower.bio}
            </div>
            );
  }
}

function showCompany(follower) {
  if (follower.company){
    return (
           <div className="follower-company clearfix">
             <div className="follower-company-icon">
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
            <div className="follower-company-text">
              {follower.company}
            </div>
           </div>
           )
  }
}

function showLocation(follower) {
  if (follower.location){
    return (
           <div className="follower-location clearfix">
             <div className="follower-location-icon">
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
            <div className="follower-location-text">
            {follower.location}
            </div>
           </div>
           )
  }
}

function showFollower (follower) {
  return (<div key={follower.login} className="follower-user clearfix">
            <div className='follower-img'>
              <a href={follower.html_url} title={follower.login}>
                <img src = {follower.avatar_url} alt="Avatar" />
              </a>
            </div>
            <div className="follower-details">
              <div className="follower-id clearfix">
              <a href={follower.html_url} title={follower.login}>
                <div className="follower-name">{follower.name}</div>
              </a>
              <a href={follower.html_url} title={follower.login}>
                <div className="follower-login">{follower.login}</div>
              </a>
              </div>
            {showBio(follower)}
            <div className="location-company clearfix">
              {showCompany(follower)}
              {showLocation(follower)}
              </div>
             </div>
          </div>
         )
}


function Followers(props) {
  useEffect(() => {
    if (props.followerIsLoading){
    get('users/Rpratik13/followers')
    .then(response => response.json())
    .then(users => {
      users.map(user => {
        get('users/' + user.login)
        .then(response => response.json())
        .then(user => {
          props.addFollower(user)
        })
        .catch(err => console.log(err));
      })
      props.setFollowerLoading(false);
    })
    .catch(err => console.log(err));
    }
  }, []);

  return (
          <div className = "followers-list">
            {props.followerIsLoading && <div className="loading repo-loading"/>}
            {!props.followerIsLoading && 
              <div>      
                {props.followers.map(follower => showFollower(follower))}        
              </div>
            } 
          </div>
         );
}

function mapStateToProps(state) {
  return {
    followers : state.follower.followers,
    followerIsLoading : state.follower.followerIsLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addFollower: follower => {
      dispatch(followersActions.addFollower(follower));
    },

    setFollowerLoading: val => {
      dispatch(followersActions.setLoading(val));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Followers);