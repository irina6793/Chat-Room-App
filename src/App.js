import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

var config = {
    apiKey: "AIzaSyAznF2GHVzfH2N1-mf_-wB1JJuO1e3H8QY",
    authDomain: "bloc-chat-a977e.firebaseapp.com",
    databaseURL: "https://bloc-chat-a977e.firebaseio.com",
    projectId: "bloc-chat-a977e",
    storageBucket: "bloc-chat-a977e.appspot.com",
    messagingSenderId: "99045457457"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props)
    this.state ={
      room : [
        { body: "Connecting..."},
        { author: "You", body: "Hello", me: true},
        { author: "Them", body: "Hi" },
      ]
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1 className="Room-List">Welcome to Chat Rooms</h1>
        </header>
        <RoomList firebase={firebase}/>
        <MessageList firebase={firebase}/>
         </div>
     );
  }
}

export default App;
