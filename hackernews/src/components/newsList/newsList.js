import React from 'react';
import NewsItem from '../newsItem/newsItem';
import Navigation from '../Navigation/Navigation';

class NewsList extends React.Component {
  constructor () {
    super();
    this.state = {
      detailsId   : -1,
      isLoading   : false,
      list        : [],
      page        : 1,
      showDetails : false,
    };
  }

  componentDidMount = () => {
    this.fetchNewsList();
  }

  fetchNewsList = () => {
    this.setState({
      isLoading : true,
    });

    fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    .then(response => response.json())
    .then(response => this.setState({
      isLoading : false,
      list      : response,
    }));
  }
  
  setPage = (pageChange) => {
    let newPage = this.state.page + pageChange;
    if ((0 < newPage) && 
        (newPage < parseInt((this.state.list.length / 20) + 1))) {
    
      this.setState({
        page : newPage,
      });
    }
  }
   
  showNewsItem = (newsArr) => {
    return (newsArr.map((newsId) => (
              <NewsItem id = {newsId}/>
            )));
  }

  render () {
    return (<div>
             <Navigation news = {this} /> 
              {this.state.isLoading && <div className = "loader"></div>}
              {!this.state.isLoading &&
               <ul className = "news-list">
                {this.state.list.slice((20 * (this.state.page - 1)), (20 * (this.state.page)))
                 .map((newsId) => (
                  <NewsItem id = {newsId} key = {newsId}/>
                 ))
                }
              </ul>}
            </div>
            );
  }
}

export default NewsList;