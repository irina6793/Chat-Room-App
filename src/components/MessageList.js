import React, { Component } from "react";
import * as firebase from "firebase";

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
        <span className="message_name">{this.props.activeRoom.name}</span>
        {this.props.activeRoom.message}
        <input
          type="text"
          value={this.state.message}
          onChange={this.handleChange.bind(this)}
        />
        <form onSubmit={this.handleSubmit.bind(this)}>
          <button type="submit">Submit</button>
          <label>Messages:</label>
          <span> {this.state.description} </span>
        </form>
        <ul>
          {this.state.messages
            .filter(message => this.props.activeRoom.key === message.roomId)
            .map((message, i) => {
              return (
                <li key={i}>
                  {message.content} : {message.username} : {message.sentAt}
                </li>
              );
            })}
        </ul>
      </section>
    );
  }
}

export default MessageList;
