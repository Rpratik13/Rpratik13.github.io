import React from 'react';
import './App.css';
import { connect } from 'react-redux';

import NavBar from './components/NavBar';
import Starred from './components/Starred';
import Profile from './components/Profile';
import Followers from './components/Followers';
import Following from './components/Following';
import Repository from './components/Repository';

function showRepos(props) {
  if (props.tabSelected === 'repositories')
  return (
    <Repository />
  )
}

function showStarred(props) {
  if (props.tabSelected === 'starred')
  return (
    <Starred />
  )
}


function showFollowers(props) {
  if (props.tabSelected === 'followers')
  return (
      <Followers />
  )
}


function showFollowing(props) {
  if (props.tabSelected === "following")
  return (
      <Following />
  )
}

function App(props) {
  return (
      <div className="App clearfix">
        <NavBar />
        <Profile />
        {showRepos(props)}
        {showStarred(props)}
        {showFollowers(props)}
        {showFollowing(props)}
      </div>
  );
}

function mapStateToProps(state) {
  return {
    tabSelected : state.navBar.isSelected,
  };
}

export default connect(mapStateToProps)(App);
