import './ToDo.css';
import React from 'react';
import AddTask from '../AddTask/AddTask.js'; 
import ToDoItem from '../ToDoItem/ToDoItem.js';

class ToDo extends React.Component {
  constructor() {
    super();
    this.state = {
      items     : JSON.parse(window.localStorage.getItem('to-do-items')) || []
    };
  }  
  
  setItemState = (index) => {
    let currentState = this.state.items[index].isCompleted;
    let nextState = currentState === 'remaining' ? 'completed' : 'remaining';
    
    let newItems = this.state.items;
    this.setState({
      items : [...newItems.slice(0, index), 
               {title : newItems[index].title, isCompleted: nextState},
              ...newItems.slice(index + 1, newItems.length)]
    });
  }

  showItem = (item, index) => {
    if (item.title.toLowerCase().indexOf(this.props.searchQuery) !== -1){
      if ((this.props.navSelected === 1 && item.isCompleted === 'remaining') || 
          (this.props.navSelected === 2 && item.isCompleted === 'completed')) 
          return;

      return <ToDoItem 
              isCompleted = {item.isCompleted}
              keyIndex    = {index} 
              removeItem  = {this.removeItem}
              setState    = {this.setItemState}
              title       = {item.title} 
             />
    }
  }
  
  removeItem = (index) => {
    let newItems = this.state.items;
    this.setState({
      items : [...newItems.slice(0, index), 
               ...newItems.slice(index + 1, newItems.length)]
    });
  }

  render() {
    this.navSelected = this.props.navSelected;
    this.searchQuery = this.props.searchQuery;
    window.localStorage.setItem('to-do-items', JSON.stringify(this.state.items));
    return (<div className  = "to-do-container">
              <AddTask toDo = {this} />
              <div className = {(this.state.items.length === 0? "" : "hidden" )+ " no-task"} >
                You have no tasks. Hooray.
              </div>
              <ul>
                {
                  this.state.items.map((item, index) => this.showItem(item, index))
                }
              </ul>
            </div>);
  }
}

export default ToDo;