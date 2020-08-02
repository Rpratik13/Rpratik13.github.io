import React from 'react';
import './App.css';
import NewsList from './components/newsList/newsList';  
import NewsDetails from './components/newsDetails/newsDetails';
import { Route, BrowserRouter as Router } from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={NewsList} />
        <Route path="/hackernews/build/news/:newsId" component={NewsDetails} />
      </Router>

    </div>
  );
}

export default App;
