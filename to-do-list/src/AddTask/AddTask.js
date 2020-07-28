import './AddTask.css';
import React from 'react';

class AddTask extends React.Component {
  constructor (props) {
    super();
    this.state = {
      myInput : ''
    };
    this.toDo  = props.toDo;
  }  

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      if (this.state.myInput){
        const newList = [...this.toDo.state.items, this.state.myInput];
        this.toDo.setState({
          items: newList
        });
        
        for (var i = 0; i < newList.length; i++){
          window.localStorage.setItem('to-do-items-' + i, newList[i]);
        }
        
        window.localStorage.setItem('to-do-len', newList.length);
        
        this.setState({
          myInput : ''
        });
      }
    }
  }
  
  onChangeValue = (event) => {
    this.setState({
      myInput : event.target.value
    });
  }

  render = () => {
    return (<div className  = "add-task">
              <input  
                onChange    = {this.onChangeValue} 
                onKeyPress  = {this.handleKeyPress}
                placeholder = "Add a new task"
                value       = {this.state.myInput} 
              />
            </div>);
  }
}

export default AddTask;