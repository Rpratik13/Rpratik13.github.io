import React from 'react';
import './App.css';
import { Provider } from 'react-redux';

import Profile from './components/Profile';
import Repository from './components/Repository';
import store from './store';

function App() {
  return (
    <Provider store = {store}>
      <div className="App">
        <Profile />
        <Repository />
      </div>
    </Provider>
  );
}

// function mapStateToProps(state) {

// }

export default App;
