import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: '',

    }
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.roomsRef = this.props.firebase.database().ref('Rooms');
   }

  componentDidMount() {
       this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       this.setState({ rooms: this.state.rooms.concat( room ) });
     });
  }

  createRoom(newRoomName) {
    const roomsRef = firebase.database().ref('rooms');
    const room = {
      name: this.state.newRoomName,
    }
     this.roomsRef.push({
       this.createRoom({
         name: newRoomName,
         newRoomName: "0",
       })
  }

  handleChange(e) {
    const target = e.target
    const name = target.name
    this.setState({
      [e.target.name]: e.target.value
    });
  }

   render() {
     return (
       <div className = 'rooms'>
       <form onSubmit={this.createRoom}>
         <label>
         Room:
         <input type = 'text' name = 'room' />
         </label>
         <button type ='submit' className ='btn btn-primary'>Submit</button>
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
