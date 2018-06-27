import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      emails: [],
      user: null
  }
}

login(e) {
  console.log("Showing popup...");
  e.preventDefault();
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup( provider );
  console.log("Logged in?");
}

logOut(){
  this.props.firebase.auth().signOut();
}

componentDidMount() {
  this.props.firebase.auth().onAuthStateChanged( user => {
  this.props.setUser(user);
});
}

render() {

  return (
    <div className = "container">
    <h1>Sign-In</h1>
    <form onSubmit ={this.login.bind(this )}>
    <button type="submit">Submit</button>
    </form>
    <h2>Sign-Out</h2>
    <form onSubmit={ this.logOut.bind(this) }>
      <button type="submit">Submit</button>
    </form>
    </div>
  )
}
}

export default User;
