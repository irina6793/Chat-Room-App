import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      emails: [],
      user: ''
  }
}

login(e) {
  e.preventDefault();
  const self = this
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup( provider ).then(function(result){
  const user = result.user;
  console.log(self)
  self.props.setUser(user)
}).catch(function(error) {
   console.log("Show error if this is wrong" , error.code)
   console.log("Show error message", error.message)
   console.log("Show error email", error.email)
   console.log("Show error crediential", error.crediential)
});

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
    <div>
    <span>{this.props.user ? this.props.user.displayName : "Guest"}</span>
    <form onSubmit ={this.login.bind(this )}>
   <button type="submit">Sign-In</button>
   </form>
   <form onSubmit={ this.logOut.bind(this) }>
   <button type="submit">Sign-Out</button>
   </form>
   </div>

  )
  }
}

export default User;
