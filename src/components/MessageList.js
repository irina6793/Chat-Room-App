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
    this.roomsRef = this.props.firebase.database().ref('messages');
  

   }

   handleSubmit(e) {
     e.preventDefault();
     var message = {
       user: this.props.user,
       text: this.state.text
     }
     this.props.onMessageSubmit(message);
     this.setState({ text : ''});
   },

   handleChange(e) {
     this.setState({text: e.target.value});
   }

   componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
        const messages = snapshot.val();
        this.setState({ messages: this.state.messages.concat( messages ) });
           });
   }

  render() {
    return (
      <div className = 'messages'>
      <h2>Conversation: </h2>
      {
        this.state.messages.map((message => {
          return(
            <div>{message.author}: {message.message}</div>
          )
        })}
        </div>

            <Message
                key={i}
                user={message.user}
                text={message.text}
            />
          );
        })
      }
      </div>
    );
  }
});



        <strong>{this.props.user} :</strong>
        <span>{this.props.text}</span>
      </div>
    );
  }
});

      <input type="text" value={this.state.newMessagesList} onChange={this.handleChange.bind(this)} />
      <form onSubmit={ (e) => this.handleSubmit(e) }>
      <button type="submit">Submit</button>
      <label>
        Messages:
       </label>
        <span> {this.state.description} </span>
      </form>
      <ul className ="chats" ref="chats">
        {
          chats.map((chat) =>
          <Message chat={chat} user={username} />
        )
      }
       {
         return (
           <message
            key ={i}
            {message.message}
           />
         )
    })
  }
        </ul>
     </div>
   );
 }
}
export default MessageList;
