import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      messages: [],
      message: '',
      roomId: ''

  }
     this.handleChange = this.handleChange.bind(this);
    this.messagesRef = this.props.firebase.database().ref('messages');

  }

   handleChange(e) {
     e.preventDefault();
     this.setState({
       username: this.props.username,
       content: e.target.value,
       sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
     });
   }

   handleSubmit(e) {
     const messagesRef = this.props.firebase.database().ref(this.props.activeRoom);
     e.preventDefault();
     if (this.state.content)
     {
       this.messagesRef.push({
       username: this.state.username,
       content: this.state.message,
       sentAt: this.state.firebase.database.ServerValue.TIMESTAMP,
       roomId: this.state.roomId,
       })
       this.setState({content: ''});
     }
   }

   componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
        const messages = snapshot.val();
        this.setState({ messages: this.state.messages.concat( messages ) });
           });
   }

  render() {
    const messages = this.state.messages.filter(message => this.state.roomId === message.roomId)

    return (
      <div className = 'messages'>
      <input type="text" value={this.state.content} onChange={this.handleChange.bind(this)} />
      <form onSubmit={ (e) => this.handleSubmit(e) }>
      <button type="submit">Submit</button>
      <label>
        Messages:
       </label>
       <span> {this.state.description} </span>
        </form>
        <ul>
         {
            this.state.messages.map((message, i) => {
              return (
               <li key={i} >
                 {message.content} : {message.roomId} : {message.username} : {message.sentAt}
              </li>
          )
       })
   }
         </ul>
       </div>
    )
}
}

export default MessageList;
