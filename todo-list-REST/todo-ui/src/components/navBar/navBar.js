import './navBar.css';
import React from 'react';
import { Redirect } from 'react-router-dom';

class NavBar extends React.Component {
  constructor (props) {
    super();
    this.cookies = props.cookies;
    this.state = {
      items    : ['Home', 'Completed', 'Remaining'],
      selected : 0,
      redirect : false,
    };

    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut() {
    this.cookies.set('username', '');
    this.cookies.set('token', '');
    this.setState({
      ...this.state,
      redirect : true,
    });
  }

  render = () => {
    if (this.state.redirect) {
      return (<Redirect to = "/api/login" />)
    }
    return (<div className  = "nav-bar">
              <div className="user-functions">
                <div className = "username" >{this.cookies.cookies.username}</div>    
                <div className = "log-out" onClick = {this.handleLogOut}>Log Out</div>    
              </div>
              <ul className = "nav-items">
                {
                  this.state.items.map((item, index) => this.renderListItemColor(index, item))
                }
              </ul>
            </div>);
  }

  renderListItemColor = (index, item) => {
    let class_name;
    if (index === this.state.selected){
      class_name = "selected nav-item";
    } else {
      class_name = "not-selected nav-item";
    }
    return (<li 
              className = {class_name} 
              key       = {index} 
              onClick   = {() => this.setSelected(index)}
            > 
              {item} 
            </li>);
  }
  
  setSelected = (index) => {
    this.setState({
      selected : index
    });
    this.props.navSelected(index);
  }
}

export default NavBar;