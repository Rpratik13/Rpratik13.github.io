import React from 'react';
import './style.css';
import { Redirect } from 'react-router-dom';


class LogIn extends React.Component {
  constructor(props) {
    super();
    this.cookies = props.cookies;
    this.state = {
      error    : '',
      password : '',
      redirect : this.cookies.cookies.username ? true : false,
      username : '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
     await fetch('http://localhost:5000/api/login', {
      method  : 'POST',
      headers : {
          'content-type': 'application/json'
      },
      body    : JSON.stringify({
        username : this.state.username,
        password : this.state.password,
      })
   })
   .then(response => response.json())
   .then(response => {
     if (response.status === 200) {
       this.setState({
         ...this.state,
         redirect : true,
         error    : '',
       })
      this.cookies.set('username', response.username);
      this.cookies.set('token', response.token);
     }
     else {
       this.setState({
         ...this.state,
         error : response.message,
       })
     }
   });

  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to = "/api/todo" />)
    }
  return (
    <div>
      <h1>Log In</h1>
      <div className="error">{this.state.error}</div>
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <br />
          <input value = {this.state.username} className = "form-control" name = "username" type = "text" onChange={(event) => this.setState({...this.state, username : event.target.value})}/>
        </div>
        <div className = "form-group">
          <label>Password</label>
          <br />
          <input value = {this.state.password} className = "form-control" name = "password" type = "password" onChange={(event) => this.setState({...this.state, password : event.target.value})} />
        </div>
        <br />
        <button className = "btn">
          Log In
        </button>
      </form>
      <div className="redirect">
          Don't have an account? &nbsp; 
          <a href="/api/register">
            Register
          </a>
        </div>
    </div>
  );
 }
}

export default LogIn;