import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomsName: '',

    }
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.roomsRef = this.props.firebase.database().ref('rooms');
   }

  componentDidUpdate() {
       this.roomsRef.on('child_added', snapshot => {
       const rooms = snapshot.val();
       this.setState({ rooms: this.state.rooms.concat( rooms ) });
     });
  }

  createRoom(newRoomName) {
      this.roomsRef.push({
      name: newRoomName,
      })
    }

  handleChange(e) {
      const target = e.target
      this.setState({
      [e.target.name]: e.target.value
    });
  }

   render() {
     return (
       <div className = 'rooms'>
       <form onSubmit={this.createRoom(this.state.newRoomsName)}>
         <label>
         Room:
         <input type = 'text' value={this.state.newRoomsName} onChange={this.handleChange.bind(this)} />
         </label>
         <button type ='submit' className ='btn btn-primary'>Submit</button>
        </form>
         <ul>
         {
           this.state.rooms.map((room, i) => {
          return (
            <li key ={i}>
            {room.name}
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
