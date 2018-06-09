import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.roomsRef = this.props.firebase.database().ref('Rooms');
   }

  componentDidMount() {
       this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       this.setState({ rooms: this.state.rooms.concat( room ) });
     });
  }

  handleSubmit(e) {
    e.preventDefault();
    const roomsRef = firebase.database().ref('rooms');
    const room = {
      name: this.state.newRoomName,
       }
  }

  createRoom(newRoomName) {
    this.roomsRef.push({
      name: newRoomName
   });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

   render() {
     return (
       <div className = 'rooms'>
       <form className = 'rooms-form'>
       <legend>newRoomName</legend>
       <form onSubmit={this.handleSubmit}>
       <input type = 'text' placeholder ='Name' onChange={this.handleChange} value={this.state.newRoomName} />
       <button type = 'submit' className='rooms-button rooms-button-createRoom'>Add</button>
       </form>
       <ul>
       {
         this.state.rooms.map((room, i) => {
        return (
          <li key ={i}>
          {room}
          </li>
        )
         })
       }
       </ul>
       </div>
        );
       }
     }

 export default RoomList;
