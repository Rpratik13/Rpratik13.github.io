import './toDo.css';
import AddTask from '../addTask/addTask.js';
import React from 'react';
import ToDoItem from '../toDoItem/toDoItem.js';
import { Redirect } from 'react-router-dom';

class ToDo extends React.Component {
  constructor(props) {
    super();
    this.cookies = props.cookies;
    this.state = {
      todos : [],
      change : false,
      redirect : this.cookies.cookies.username ? false : true,
    };
  }
  
  fetchData() {
    fetch('/api/todo', {
      headers: {
        'authorization': this.cookies.cookies.token,
        'username' : this.cookies.cookies.username
    },
    })
    .then(res => res.json())
     .then(res => {
       if (res.todo === undefined){
        window.location.reload(true);
       } else {
         this.setState({todos : res.todo})}
       });
  }
  componentDidMount() {
    this.fetchData();
  }

  showItem(item, index) {
    if (item.title.toLowerCase().indexOf(this.props.searchQuery) !== -1){
      if ((this.props.navSelected === 1 && item.status === 'remaining') || 
          (this.props.navSelected === 2 && item.status === 'completed')) 
          return;
      if (!item.deleted) {
        return <ToDoItem
                parent      = {this}
                cookies     = {this.cookies}
                key         = {item.id}
                isCompleted = {item.status}
                keyIndex    = {item.id} 
                title       = {item.title} 
               />
      }
    }
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to = "/api/login" />)
    }
    return (<div className  = "to-do-container">
              <AddTask cookies = {this.cookies}
                       parent  = {this}/>
              <ul>
                {
                  this.state.todos.map((item, index) => this.showItem(item, index))
                }
              </ul>
            </div>);
  }
}

export default ToDo;