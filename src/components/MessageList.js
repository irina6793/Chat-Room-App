import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      messages: [],
      message: "",
      roomId: "",
      filteredMessages: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.messagesRef = this.props.firebase.database().ref("messages");
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ message: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.firebase) {
      this.setState({ message: "" });
      this.messagesRef.push({
        username: this.props.user.displayName,
        content: this.state.message,
        sentAt: new Date().toISOString().slice(0, 10),
        roomId: this.props.activeRoom.key
      });
    }
  }

  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      const messages = snapshot.val();
      this.setState({ messages: this.state.messages.concat(messages) });
    });
    console.log("Active room:  ", this.props.activeRoom.roomId);
  }

  componentWillReceiveProps(nextProps) {
    let filteredMessages = this.state.messages.filter(
      message => nextProps.activeRoom.roomId === message.roomId
    );
    this.setState({ filteredMessages: filteredMessages });
    console.log(this.state.filteredMessages);
  }

  render() {
    return (
      <div className="message">
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
      </div>
    );
  }
}

export default MessageList;
