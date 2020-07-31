import React from 'react';
import './Search.css';

class Search extends React.Component {
  constructor () {
    super();
    this.state = {
      myInput : ''
    };
  }  

  onChangeValue = (event) => {
    this.setState({
      myInput : event.target.value,
    });
    this.props.searchQuery(event.target.value.toLowerCase() || '');
  }

  render() {
    return (<div className  = "search">
              <input  
                onChange    = {this.onChangeValue} 
                placeholder = "Search"
                value       = {this.state.myInput} 
              />
            </div>);
  }
}

export default Search;