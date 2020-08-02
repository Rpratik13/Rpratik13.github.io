import React from 'react';
import Comment from '../Comment/Comment';

class NewsDetails extends React.Component {
  constructor () {
    super();
    this.state      = {
      display : false,
      id      : 0,
      news    : {},
    }
    this.wrapperRef = React.createRef();
  }
  
  componentDidMount = () => {
    this.fetchNewsDetails();
  }

  componentWillMount = () => {
    document.addEventListener('keydown', this.handleKeyPress);
    document.addEventListener('mousedown', this.handleClickOutside);
    this.setState({
      display : true,
    });
  }

  handleClickOutside = (event) => {
    if (this.state.display && 
        this.wrapperRef && 
        !this.wrapperRef.current.contains(event.target)) {
      
      this.setState({
        display : false,
      });
      this.props.history.goBack();
    }
  }

  handleKeyPress = (event) => {
    if (event.key === 'Escape' && 
        this.state.display){
      
      this.setState({
        display : false,
      });
      this.props.history.goBack();
    }
  }

  handleCrossClick = () => {
    this.setState({
      display : false,
    });
    this.props.history.goBack();
  }

  fetchNewsDetails = () => {
    const { newsId } = this.props.match.params;
    fetch('https://hacker-news.firebaseio.com/v0/item/' + newsId + '.json')
    .then(response => response.json())
    .then(response => this.setState({
      news : response,
    }));
  }

  showComment = () => {
    if (this.state.news.kids && 
        !this.state.news.kids.deleted) {
      return (this.state.news.kids.map((commentId) => 
              <Comment key = {commentId} commentId = {commentId} type = "comment" />)
             );
    }      
  } 
 
  render = () => {
    return (<div className = "news-details">
              <div ref = {this.wrapperRef} className = "news-details-container">
                <div className = "cross-btn" onClick = {() => this.handleCrossClick()}></div>
                <div className = "news-title">
                  <a href = {this.state.news.url}>
                    {this.state.news.title}
                  </a>
                </div>
                {this.showComment()}
              </div>
            </div>
           );
  }
}

export default NewsDetails;