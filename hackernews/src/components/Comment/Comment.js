import React from 'react';
import Loading from '../Loading/Loading';

class Comment extends React.Component {
  constructor (props) {
    super();
    this.commentRef = React.createRef();
    this.state      = {
      comment : {},
      id      : props.commentId,
      kids    : [],
      loading : false, 
      type    : props.type,
    };
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize);
    this.fetchCommentsDetails();
  }

  fetchCommentsDetails = () => {
    this.setState({
      loading : true,
      width   : this.commentRef.current.offsetWidth,
    });

    fetch('https://hacker-news.firebaseio.com/v0/item/' + this.state.id + '.json')
    .then(response => response.json())
    .then(response => this.setState({
      comment: response,
      loading: false
    }));
  }

  handleResize = () => {
    if (this.commentRef.current){
      this.setState({
        width: this.commentRef.current.offsetWidth
      });
    }
  }

  showSubComment = () => {
    if (this.state.comment.kids && !this.state.comment.deleted) {
      return (this.state.comment.kids.map((commentId) => 
              <Comment key={commentId} commentId={commentId} type="sub-comment" />)
             );
    }
  }
 
  render = () => {
    return (<div ref={this.commentRef} className={this.state.type}>
                {this.state.loading && <Loading width='100' pad={false}/>}
                {!this.state.loading &&
                
                <div className="comment-author">{this.state.comment.by}</div>}
                
                {this.commentRef.current && this.state.loading && 
                  <Loading width={this.state.width - 60} pad={false}/>}
                {!this.state.loading && 
                  <p dangerouslySetInnerHTML={{__html: this.state.comment.text}} />
                }
                
                {this.showSubComment()}
            </div>
            );
  }
}

export default Comment;