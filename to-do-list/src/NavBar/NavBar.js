import './NavBar.css';
import React from 'react';

class NavBar extends React.Component {
  constructor () {
    super();
    this.state = {
      items    : ['Home', 'Completed', 'Remaining'],
      selected : 0
    };
  }

  render = () => {
    return (<div className  = "nav-bar">
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