import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

var config = {
   apiKey: "AIzaSyDAiBjJjlWbzgzaSuw2uV8w9BDpVEJW8Lw",
   authDomain: "bloc-chat-40f73.firebaseapp.com",
   databaseURL: "https://bloc-chat-40f73.firebaseio.com",
   projectId: "bloc-chat-40f73",
   storageBucket: "bloc-chat-40f73.appspot.com",
   messagingSenderId: "18347634207"
 };
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <RoomList firebase={firebase}

        />
          <h1 className="Room-List">Welcome to Chat Rooms</h1>

        </header>
         </div>

    );
  }
}

export default App;
