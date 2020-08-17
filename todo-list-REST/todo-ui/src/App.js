import React from 'react';
import './App.css';
import Register from './components/register/register.js';
import LogIn from './components/login/login.js';
import ToDo from './components/toDo/toDo.js';
import NavBar from './components/navBar/navBar';
import Search from './components/search/search';
import { withCookies } from 'react-cookie';

import { Route, BrowserRouter as Router } from 'react-router-dom';
class App extends React.Component {
  constructor (props) {
    super();
    this.props = props;
    this.state = {
      navSelected : 0,
      searchQuery : ''
    };
  }

  setNavSelected = (index) => {
    this.setState({
      navSelected : index
    });
  }

  setSearchQuery = (query) => {
    this.setState({
      searchQuery : query
    });
  }
  render (){ 
  return (
    <Router>
      <Route path="/api/register" component={() => <Register cookies={this.props.cookies} />} />
      <Route path="/api/login" component={() => <LogIn cookies={this.props.cookies}/>} />
      <Route path="/api/todo" render ={(props) => 
        <div>
          <NavBar navSelected = {this.setNavSelected} cookies={this.props.cookies}/>
          <Search searchQuery = {this.setSearchQuery} />
          <ToDo 
                cookies={this.props.cookies}
                navSelected = {this.state.navSelected} 
                searchQuery = {this.state.searchQuery}
          />
        </div>}
      />
    </Router>
  );
  }
}

export default withCookies(App);

