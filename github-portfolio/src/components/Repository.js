import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as repositoryActions from '../actions/repositoryActions';
import store from '../store';
import Filter from './Filter.js';
import '../styles/repository.css';

import { get } from '../Utils/https.js';


function checkType(repo, type) {
  if ((type === '') ||
      (type === 'private' && repo.private) ||
      (type === 'public' && !repo.private) ||
      (type === 'forks' && repo.fork) ||
      (type === 'sources' && !repo.fork) ||
      (type === 'archived' && repo.archived) ||
      (type === 'mirrors' && repo.mirror_url)) {
        return true;
      }
  return false;
}

function showRepoDetails(repo) {
  if (repo.description) {
    return (<div className="repo-desc">{repo.description}</div>)
  }
}

function showForked(repo, props) {
  if (repo.fork && props.forked_repos[repo.name]){   
    return (<div className="forked-owner">{'Forked from ' + props.forked_repos[repo.name].parent.full_name}</div>)
  }
}

function showLanguage(repo, props) {
  let classes = {
    'Python' : 'python',
    'Jupyter Notebook' : 'jupyter',
    'C++' : 'c',
    'HTML' : 'html',
    'JavaScript' : 'js',
    'CSS' : 'css'
  };
  
  if (!repo.fork){
    return (
            <div className="repo-language clearfix">
               <div className={'circle ' + classes[repo.language]} />
               <div className="repo-language-text">
                 {repo.language}
               </div>
            </div>
          );
  } else if (props.forked_repos[repo.name] && props.forked_repos[repo.name].parent.language){
      return (
        <div className="repo-language clearfix">
           <div className={'circle ' + classes[props.forked_repos[repo.name].parent.language]} />
           <div className="repo-language-text">
             {props.forked_repos[repo.name].parent.language}
           </div>
        </div>
    ); 
  }
}

function showForks(repo, props) {
    if (!repo.fork && repo.forks) {
    return (<div className="repo-forks clearfix">
              <svg aria-label="fork" 
                   className="forks-icon" 
                   viewBox="0 0 16 16" 
                   version="1.1" 
                   width="16" 
                   height="16" 
                   role="img"
              >
                <path fillRule="evenodd" 
                      d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 
                         2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 
                         8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25
                         0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 
                         01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 
                         0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 
                         0 000 1.5z" />
              </svg>
              <div className="repo-forks-text">
                {repo.forks}
              </div>
            </div>)
  } else if (repo.fork && props.forked_repos[repo.name] && props.forked_repos[repo.name].parent.forks){
    return (<div className="repo-forks clearfix">
      <svg aria-label="fork" 
           className="forks-icon" 
           viewBox="0 0 16 16" 
           version="1.1" 
           width="16" 
           height="16" 
           role="img"
      >
        <path fillRule="evenodd" 
              d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 
                 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 
                 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25
                 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 
                 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 
                 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 
                 0 000 1.5z" />
      </svg>
      <div className="repo-forks-text">
        {props.forked_repos[repo.name].parent.forks}
      </div>
    </div>)
  }
}

function showLicense(repo, props) {
  if (repo.license) {
  return (<div className="repo-license clearfix">
            <div className="license-icon">
              <svg 
                viewBox="0 0 16 16" 
                version="1.1" 
                width="16" 
                height="16" 
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 
                  0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 
                  3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 
                  0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 
                  3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 
                  0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 
                  0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 
                  01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 
                  0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 
                  00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 
                  3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 
                  0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 
                  0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 
                  1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 
                  6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"
                />
              </svg>
            </div>
            <div className="repo-license-text">
              {repo.license.name}
            </div>
          </div>)
  } 
}

function showUpdateDate(repo) {
  return (
          <div className="repo-updated">
          {'Updated on ' + repo.updated_at.slice(0, 10)}
          </div>
        )
}

function showStarButton(repo) {
  return (<div className="star-button">
            <svg 
              className="star-button-icon" 
              viewBox="0 0 16 16" 
              version="1.1" 
              width="16" 
              height="16" 
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 
                   0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 
                   12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 
                   0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 
                   5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 
                   3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 
                   01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
              />
            </svg>
            <div className="star-button-text">
              Star
            </div>
          </div>)
}

function showRepositories(repo, props) {
   let filters = store.getState().filter;
   let search = filters.search;
   let filter_language = filters.filter_language;
   let type = filters.type;
   if ((search === '' || repo.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) &&
       ((filter_language === '' || (repo.language && repo.language.toLowerCase() === filter_language.toLowerCase())))
       && checkType(repo, type)) {
     return (
            <li key = {repo.id} className="repo">
              <div className="repo-name">
                <a href={repo.html_url} title={repo.name}>
                  {repo.name}
                </a>
              </div>
              {showForked(repo, props)}
              {showRepoDetails(repo)}
              <div className="repo-details clearfix">
                {showLanguage(repo, props)}
                {showForks(repo, props)}
                {showLicense(repo, props)}
                {showUpdateDate(repo)}
              </div>
              {showStarButton(repo)}
            </li>);
   }
}

function Repository(props) {
  useEffect(() => {
    get('users/Rpratik13/repos')
    .then(response => response.json())
    .then(repositories => {
      props.setRepositories(repositories)
      repositories.map(repo => {
        if (repo.fork) {
          get('repos/' + repo.full_name)
          .then(response => response.json())
          .then(repoData => {
            let forkedRepo = {};
            forkedRepo[repo.name] = repoData;
            props.addForkedRepos(forkedRepo);
          })
        }
      })
      props.setLoading(false);
    })
  }, []);

  return (
          <div className="repos">
          <Filter />
          {props.isLoading && <div className="loading repo-loading"></div>}
          {!props.isLoading && 
            <ul>
              {props.repositories.map(repo => showRepositories(repo, props))}  
            </ul>
          }
          </div>
         );
}

function mapStateToProps(state) {
  return {
    filter_language : state.filter.filter_language,
    repositories    : state.repository.repositories,
    search          : state.filter.search,
    type            : state.filter.type,
    forked_repos    : state.repository.forked_repos,
    isLoading       : state.repository.isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setRepositories: repositories => {
      dispatch(repositoryActions.setRepositories(repositories));
    },

    addForkedRepos: repoObj => {
      dispatch(repositoryActions.addForkedRepos(repoObj));
    },

    setLoading: val => {
      dispatch(repositoryActions.setLoading(val));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Repository);