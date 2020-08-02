import React from 'react';

class Navigation extends React.Component {
  constructor (props) {
    super();
    this.news = props.news;
  }

  render = () => {
    return (<div className = "nav-bar">
              <div className = "nav-bar-container clearfix">
              <div className = "title">HackerNews</div>
                <div className = "nav-btns">
                  <div className = "arrow arrow-left" onClick = {() => this.news.setPage(-1)}></div>
                  <div className = "page-num">{this.news.state.page}</div>
                  <div className = "arrow arrow-right" onClick = {() => this.news.setPage(1)}></div>
                </div>
              </div>
            </div>
           );
  }
}

export default Navigation;