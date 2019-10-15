import React, { Component } from "react";
import * as firebase from "firebase";
import Baratunde from "../baratunde.svg";
import ConanOBrian from "../conanobrien.jpg";
import MaryMeeker from "../marymeeker.jpg";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessages: ""
    };
    this.messagesRef = this.props.firebase.database().ref("messages");
    this.createMessage = this.createMessage.bind(this);
    this.convertTimeStamp = this.convertTimeStamp.bind(this);
  }

  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      const messages = snapshot.val();
      this.setState({ messages: this.state.messages.concat(messages) });
    });
  }

  convertTimeStamp(timeStamp) {
    var d = new Date(timeStamp),
      yyyy = d.getFullYear(),
      mm = ("0" + (d.getMonth() + 1)).slice(-2),
      dd = ("0" + d.getDate()).slice(-2),
      hh = d.getHours(),
      h = hh,
      min = ("0" + d.getMinutes()).slice(-2),
      ampm = "AM",
      time;

    if (hh > 12) {
      h = hh - 12;
      ampm = "PM";
    } else if (hh === 12) {
      h = 12;
      ampm = "PM";
    } else if (hh === 0) {
      h = 12;
    }
    time = yyyy + "-" + mm + "-" + dd + ", " + h + ":" + min + " " + ampm;
    return time;
  }

  createMessage(e) {
    e.preventDefault();
    if (!this.props.activeRoom || !this.state.messages) {
      return;
    }
    this.setState({ messages: [...this.state.newMessages], newMessages: "" });
    if (this.props.user !== null) {
      this.messagesRef.push({
        content: this.state.newMessages,
        sentAt: firebase.database.ServerValue.TIMESTAMP,
        roomId: this.props.activeRoom.key,
        username: this.props.user.displayName || "guest"
      });
    } else {
      alert("please sign in");
    }
  }

  handleMessageChange(e) {
    e.preventDefault();
    this.setState({ newMessages: e.target.value });
  }

  render() {
    return (
      <section className="messages">
        <div className="container">
          <div className="row">
            <div className="col-sm-9">
              <div className="jumbotron">
                <div id="messagesListName">
                  <ul>
                    {this.state.messages
                      .filter(
                        message => message.roomId === this.props.activeRoom.key
                      )
                      .map((message, index) => (
                        <li key={index}>
                          {message.content}{" "}
                          {this.convertTimestamp(message.sentAt)}{" "}
                          {message.username}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="col-sm-9">
                <div className="createMessages">
                  <p>Messages:</p>
                  <form onSubmit={this.createMessages}>
                    <input
                      type="text"
                      value={this.state.newMessages}
                      onChange={e => this.handleMessageChange(e)}
                    />
                    <input type="submit" id="submit" name="submission" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default MessageList;
