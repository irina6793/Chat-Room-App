import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      messages: [],
      message: '',
      roomId: '',
      filteredMessages: []

  }
     this.handleChange = this.handleChange.bind(this);
    this.messagesRef = this.props.firebase.database().ref('messages');

  }

   handleChange(e) {
     e.preventDefault();
     this.setState({message: e.target.value})
   }

   handleSubmit(e) {
     e.preventDefault();
     if (this.props.firebase)
     {
       this.messagesRef.push({
       username: this.state.username,
       content: this.state.message,
       sentAt: new Date().toISOString().slice(0,10),
       roomId: this.props.activeRoom.key,
       })
       this.setState({message: ''});
     }
   }

   componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
        const messages = snapshot.val();
        this.setState({ messages: this.state.messages.concat( messages ) });
           });
        let filteredMessages = this.state.messages.filter(messages => this.props.activeRoom.roomId === messages.roomId);
        this.setState({filteredMessages: filteredMessages});
   }

   componentWillReceiveProps(nextProps){
     let filteredMessages = this.state.messages.filter(messages => nextProps.activeRoom.roomId === messages.roomId);
     this.setState({filteredMessages: filteredMessages});

         this.setState({filteredMessages: filteredMessages});
         console.log(this.state.filteredMessages)
      };

  render() {
    return (
      <div className = 'messages'>
      <input type="text" value={this.state.content} onChange={this.handleChange.bind(this)} />
      <form onSubmit={ this.handleSubmit.bind(this) }>
      <button type="submit">Submit</button>
      <label>
        Messages:
       </label>
       <span> {this.state.description} </span>
        </form>
        <ul>
         {
            this.state.filteredMessages.map((message, i) => {
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
