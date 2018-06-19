import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      messages: [],
      message: ''
  }

    this.handleChange = this.handleChange.bind(this);

    this.messagesRef = this.props.firebase.database().ref('messages');

  }

   handleChange(e) {
     this.setState({message: e.target.value});
   }

   handleSubmit(e) {
     e.preventDefault();
     if (this.state.message)
     {


       this.messagesRef.push({
       username: this.state.message,
       content: this.state.message,
       sentAt: this.state.message,
       roomId: this.state.message,
       })
       this.setState({message: ''});
     }
   }

   componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
        const messages = snapshot.val();
        this.setState({ messages: this.state.messages.concat( messages ) });
           });
   }

  render() {
    return (
      <div className = 'messages'>
      <input type="text" value={this.state.message} onChange={this.handleChange.bind(this)} />
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
