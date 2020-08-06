import React from 'react';
import { connect } from 'react-redux';
import * as navBarActions from '../actions/navBarActions';

import '../styles/navBar.css';


function NavBar(props) {
  let classNames = {
    'repositories' : 'unselected',
    'starred'      : 'unselected',
    'followers'    : 'unselected',
    'following'    : 'unselected',
  };

  classNames[props.isSelected] = 'selected';

   return (
          <div className = "nav-bar">
            <div className = "nav-links clearfix">
              <div className={"nav-link " + classNames['repositories']} 
                   onClick = {() => props.setTab('repositories')}
              >
                Repositories
              </div>
              <div className={"nav-link " + classNames['starred']}
                   onClick = {() => props.setTab('starred')}>
                Starred
              </div>
              <div className={"nav-link " + classNames['followers']}
                   onClick = {() => props.setTab('followers')}
              >
                Followers
              </div>
              <div className={"nav-link " + classNames['following']}
                   onClick = {() => props.setTab('following')}
              >
                Following
              </div>
            </div>
          </div>
         );
}

function mapStateToProps(state) {
  return {
    isSelected : state.navBar.isSelected
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTab: tab => {
      dispatch(navBarActions.setTab(tab));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);