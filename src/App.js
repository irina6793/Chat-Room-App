import React, { Component } from 'react';
<<<<<<< HEAD
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
=======
import logo from './logo.svg';
import './App.css';

class App extends Component {
>>>>>>> 132fe8ac303d382eb9539d62038f445dab5f32fe
  render() {
    return (
      <div className="App">
        <header className="App-header">
<<<<<<< HEAD
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <main>
           <Route exact path="/" component={Landing} />
           <Route path="/RoomList" component={RoomList} />
         </main>
         </div>
=======
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
>>>>>>> 132fe8ac303d382eb9539d62038f445dab5f32fe
    );
  }
}

<<<<<<< HEAD
export default RoomList;
=======
export default App;
>>>>>>> 132fe8ac303d382eb9539d62038f445dab5f32fe
