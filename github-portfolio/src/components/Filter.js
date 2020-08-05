import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as filterActions from '../actions/filterActions';

import '../styles/filter.css';

let addedLanguages = [];

function showLanguages(language) {
  if (!addedLanguages.includes(language)){
    addedLanguages.push(language)
    return <option key={language} value = {language.toLowerCase()}>{language}</option>
  }
  return;
}

function Filter(props) {
  useEffect(() => {
    props.repositories.map(repo => { 
      if (!props.languages.includes(repo.language) && repo.language) {
        props.addLanguage(repo.language)
      }});   
  });
  
  
  return (<div>
            <input 
              className = "search"
              onChange = {event => props.setSearch(event.target.value)}
              placeholder = 'Find a repository...'
              type     = "text" 
              value    = {props.search} 
            />
            <select
              className = "type" 
              id       = "type" 
              name     = "type"
              onChange = {event => props.setType(event.target.value)}
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
              onChange = {event => props.setLanguage(event.target.value)}
            >
              <option key="all" value = "">All</option>
              {props.languages.map(language => showLanguages(language))}
              {addedLanguages = []}
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
    
    addLanguage: language => {
      dispatch(filterActions.addLanguage(language));
    },

    setLanguage: language => {
      dispatch(filterActions.setLanguage(language));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);