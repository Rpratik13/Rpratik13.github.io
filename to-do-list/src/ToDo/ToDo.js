import './ToDo.css';
import React from 'react';
import AddTask from '../AddTask/AddTask.js'; 

class ToDo extends React.Component {
  constructor() {
    super();
    var completedList = []
    var toDoList      = []

    for (var i = 0; i < (window.localStorage.getItem('to-do-len') || 0); i++){
      toDoList.push(window.localStorage.getItem('to-do-items-' + i));    
      if (window.localStorage.getItem('to-do-completed-' + i) === 'true'){
        completedList.push(i)
      }
    }
    
    this.state = {
      completed : completedList,
      items     : toDoList
    };
  }  

  render() {
    this.navSelected = this.props.navSelected;
    this.searchQuery = this.props.searchQuery;
    return (<div className  = "to-do-container">
              <AddTask toDo = {this} />
              <ul>
                {
                  this.state.items.map((item, index) => this.setItemState(index, item))
                }
              </ul>
            </div>);
  }

  setCompleted = (index) => {
    let newList;
    let arrayLen = (window.localStorage.getItem('to-do-len') || 0);
    if (this.state.completed.includes(index)){
      newList = this.state.completed.filter(function(e) { return e !== index })
    } else {
      newList = [...this.state.completed, index];
    }

    this.setState({
      completed : newList
    });

    for (var i = 0; i <= arrayLen; i++){
      let bool = false;
      if (newList.includes(i)){
        bool = true;
      }
      window.localStorage.setItem('to-do-completed-' + i, bool);
    }
  }

  setItemState = (index, item) => {
    let class_name;
    if (this.state.completed.includes(index)){
      class_name = "completed";
      if (this.navSelected === 2)
        return;
    } else {
      class_name = "remaining";
      if (this.navSelected === 1)
        return;
    }
    if (item.toLowerCase().indexOf(this.searchQuery) !== -1){
      return (<li 
                className = "item-container clearfix"
                key       = {index} 
              >
                <div className = {class_name + " item"}>
                  {item}
                </div>
                <div 
                  className = {class_name + "-check check"} 
                  onClick   = {() => this.setCompleted(index)} 
                />
              </li>);
    }
    return;
  }

}

export default ToDo;