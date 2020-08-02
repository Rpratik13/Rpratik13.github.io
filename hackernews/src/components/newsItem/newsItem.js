import React from 'react';
import {Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

class NewsItem extends React.Component {
  constructor (props) {
    super();
    this.id          = props.id;
    this.newsItemRef = React.createRef();
    this.state       = {
      list    : {},
      loading : false,
    }
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize);
    this.fetchNews();
  }
  
  handleResize = () => {
    if (this.newsItemRef.current){
      this.setState({
        width : this.newsItemRef.current.offsetWidth,
      });
    }
  }

  fetchNews = () => {
    this.setState({
      loading : true,
      width   : this.newsItemRef.current.offsetWidth,
    });

    fetch('https://hacker-news.firebaseio.com/v0/item/' + this.id + '.json')
    .then(response => response.json())
    .then(response => this.setState({
      list    : response,
      loading : false,
    }));
  }

  render = () => {
    return (<div ref={this.newsItemRef} className="news-item-container">
              {this.newsItemRef.current && 
               this.state.loading && 
               <Loading width={this.state.width - 60} pad={true} />
              }
                
              <Link to = {"/news/" + this.id}>
                {!this.state.loading && 
                 <li className = "news-item" key = {this.id}>{this.state.list.title}</li>
                }
              </Link>
            </div> 
            );
  }
}

export default NewsItem;