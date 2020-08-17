import '../toDo/toDo.css';
import React from 'react';

class ToDoItem extends React.Component {
  constructor(props) {
    super();
    this.parent  = props.parent;
    this.cookies = props.cookies;
    this.state = {
      title     : props.title,
      keyIndex  : props.keyIndex 
    };
  }

  deleteToDo() {
    fetch('/api/todo/delete?id=' + this.state.keyIndex, {
      headers : {
        'authorization' : this.cookies.cookies.token,
        'content-type' : 'application/json'
      },
    })
    .then(res => {
      this.parent.fetchData();
    });
  }
  
  completeToDo() {
    fetch('/api/todo/complete?id=' + this.state.keyIndex, {
      headers : {
        'authorization' : this.cookies.cookies.token,
        'content-type' : 'application/json'
      },
    })
    .then(res => {
      this.parent.fetchData();
    });
  }
  
  render() {return (
             <li key = {this.state.keyIndex} className = "item-container clearfix">
               <div className = {this.props.isCompleted + " item"}>
                 {this.state.title}
              </div>
              <div className="delete" 
                    onClick={() => this.deleteToDo()}/>
              <div 
                  className = {this.props.isCompleted + "-check check"}
                  onClick={() => this.completeToDo()}
              />

            </li>);
  }
}

export default ToDoItem;