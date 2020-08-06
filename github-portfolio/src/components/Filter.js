import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as filterActions from '../actions/filterActions';

import '../styles/filter.css';


function Filter(props) {
  useEffect(() => {
    props.resetFilter();  
  }, []);
  
  
  return (<div>
            <input 
              className = "search"
              onChange = {event => {
                props.setSearch(event.target.value)
                props.repoProps.resetPage();
              }}
              placeholder = 'Find a repository...'
              type     = "text" 
              value    = {props.search} 
            />
            <select
              className = "type" 
              id       = "type" 
              name     = "type"
              onChange = {event => { 
                props.setType(event.target.value)
                props.repoProps.resetPage();
              }}
            >
              <option key="all" value = "">All</option>
              <option key="public" value = "public">Public</option>
              <option key="private" value = "private">Private</option>
              <option key="sources" value = "sources">Sources</option>
              <option key="forks" value = "forks">Forks</option>
              <option key="archived" value = "archived">Archived</option>
              <option key="mirrors" value = "mirrors">Mirrors</option>
            </select>

            <select 
              className = "language"
              id       = "language" 
              name     = "language"
              onChange = {event => {
                props.setLanguage(event.target.value)
                props.repoProps.resetPage();
              }}
            >
              <option key="all" value = "">All</option>
              <option key="python" value = "Python">Python</option>
              <option key="jupyter" value = "Jupyter Notebook">Jupyter Notebook</option>
              <option key="c++" value = "C++">C++</option>
              <option key="html" value = "HTML">HTML</option>
              <option key="css" value = "CSS">CSS</option>
          </select>
          </div>
         );
}

function mapStateToProps(state) {
  return ({
    languages    : state.filter.languages,
    repositories : state.repository.repositories, 
  });
}

function mapDispatchToProps(dispatch) {
  return {
    setSearch: search => {
      dispatch(filterActions.setSearch(search));
    },
    
    setType: type => {
      dispatch(filterActions.setType(type));
    },

    setLanguage: language => {
      dispatch(filterActions.setLanguage(language));
    },

    resetFilter: () => {
      dispatch(filterActions.resetFilter());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);