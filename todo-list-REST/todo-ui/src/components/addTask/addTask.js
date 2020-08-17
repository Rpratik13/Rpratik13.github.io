import './addTask.css';
import React from 'react';

class AddTask extends React.Component {
  constructor (props) {
    super();
    this.parent  = props.parent;
    this.cookies = props.cookies;
    this.state   = {
      task : ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:5000/api/todo/add', {
      method: 'POST',
      headers: {
        'authorization': this.cookies.cookies.token,
        'content-type' : 'application/json',
      },
      body : JSON.stringify(this.state)
    })
    .then(res => {
      this.setState({
        ...this.state, 
        task : ''
      });
      this.parent.fetchData();
    })
  }

  render() {
    return (<div className  = "add-task">
              <form
                className = "add"
                onSubmit  = {this.handleSubmit}
              >
                <input  
                  name        = "title"
                  onChange    = {(event) => this.setState({ ...this.state, task : event.target.value})}
                  placeholder = "Add a new task"
                  type        = "text"
                  value       = {this.state.task}
                />
              </form>
            </div>
            );
  }
}

export default AddTask;