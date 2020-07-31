import React from 'react';
import ToDo from '../ToDo/ToDo.js';
import Search from'../Search/Search.js';
import NavBar from '../NavBar/NavBar.js';

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      navSelected : 0,
      searchQuery : ''
    };
  }

  setNavSelected = (index) => {
    this.setState({
      navSelected : index
    });
  }

  setSearchQuery = (query) => {
    this.setState({
      searchQuery : query
    });
  }

  render = () => {
    return (<div className="App">
              <NavBar navSelected = {this.setNavSelected} />
              <Search searchQuery = {this.setSearchQuery} />
              <ToDo 
                navSelected = {this.state.navSelected} 
                searchQuery = {this.state.searchQuery}
              />
            </div>);
  }
}

export default App;