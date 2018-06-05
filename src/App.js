import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import {RoomList} from './components/RoomList';

var config = {
  apiKey: "AIzaSyAX6rztCaKXSxIpmfXfsa7bhBbjHXKAYMo",
  authDomain: "bloc-chat-3e717.firebaseapp.com",
  databaseURL: "https://bloc-chat-3e717.firebaseio.com",
  projectId: "bloc-chat-3e717",
  storageBucket: "bloc-chat-3e717.appspot.com",
  messagingSenderId: "763165262561"
};
firebase.initializeApp(config);

class RoomList extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <main>
           <Route exact path="/" component={Landing} />
           <Route path="/RoomList" component={RoomList} />
         </main>
         </div>
    );
  }
}

export default RoomList;
