import '../ToDo/ToDo.css';
import React from 'react';

class ToDoItem extends React.Component {
  constructor(props) {
    super();
    this.state = {
      itemState : 'remaining',
      title     : props.title,
      keyIndex  : props.keyIndex 
    };
  }  

  render() {return (
             <li key = {this.state.keyIndex} className = "item-container clearfix">
               <div className = {this.props.isCompleted + " item"}>
                 {this.state.title}
              </div>
              <div 
                  className = {"delete"} 
                  onClick   = {() => this.props.removeItem(this.state.keyIndex)} 
              />
              <div 
                  className = {this.props.isCompleted + "-check check"} 
                  onClick   = {() => this.props.setState(this.state.keyIndex)} 
              />

            </li>);
  }

  

}

export default ToDoItem;