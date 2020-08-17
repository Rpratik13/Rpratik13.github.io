import React   from 'react';
import './style.css';
import { Redirect } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super();
    this.cookies = props.cookies;
    this.state = {
      fname : '',
      lname : '',
      username : '',
      password : '',
      redirect : this.cookies.cookies.username ? true : false,
      error    : '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  async handleSubmit(event) {
    event.preventDefault();
    await fetch('http://localhost:5000/api/register/', {
      method: 'POST',
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify({
        fname : this.state.fname,
        lname : this.state.lname,
        username : this.state.username,
        password : this.state.password,
      })
   })
   .then(response => response.json())
   .then(response => {
      if (response.status === 200){
        this.setState({
          ...this.state,
          redirect : true,
        });
      }
      else {
        this.setState({
          ...this.state,
          error : response.msg || response.message,
        })
      } 
   })
  }


  render() {
    if (this.state.redirect) {
      return <Redirect to = "/api/login" />
    }
  return (
    <div>
      <h1>Register</h1>
      <div className = "error">{this.state.error}</div>
      <form onSubmit={this.handleSubmit}>
        <div className = "form-group">
          <label>First Name</label>
          <br />
          <input value={this.state.fname} className = "form-control" name = "firstName" type = "text" onChange={(event) => this.setState({...this.state, fname : event.target.value})}/>
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <br />
          <input value={this.state.lname} className = "form-control" name = "lastName" type = "text" onChange={(event) => this.setState({...this.state, lname : event.target.value})}/>
        </div>
        <div className="form-group">
          <label>Userame</label>
          <br />
          <input value={this.state.username} className = "form-control" name = "username" type = "text" onChange={(event) => this.setState({...this.state, username : event.target.value})}/>
        </div>
        <div className = "form-group">
          <label>Password</label>
          <br />
          <input value={this.state.password} className = "form-control" name = "password" type = "password" onChange={(event) => this.setState({...this.state, password : event.target.value})}/>
        </div>
        <br />
          <button className = "btn" type="Submit">
            Register
          </button>
        </form>
        <div className="redirect">
          Already have an account? &nbsp; 
          <a href="/api/login">
            Log In
          </a>
        </div>
      </div>
    );
  }
}

export default Register;