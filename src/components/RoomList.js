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

   handleChange(e) {
     this.setState({newRoomsName: e.target.value});
   }

   handleSubmit(e) {
        event.preventDefault();
        if (!this.state.newRoomsName) { return }
        const rooms = { description: this.state.newRoomsName, isCompleted: false };
        this.setState({ rooms: [...this.state.rooms], newRoomsName: '' });
    }

  componentDidMount() {
       this.roomsRef.on('child_added', snapshot => {
       const rooms = snapshot.val();
       this.setState({ rooms: this.state.rooms.concat( rooms ) });
          });
  }

  createRoom(newRoomName) {
      this.setState({value: ''});
      this.roomsRef.push({
      name: newRoomName,
      })
    }

   render() {
     return (
       <div className = 'rooms'>
       <form onSubmit={() => this.createRoom(this.state.newRoomsName)}>
         <label>
         Room:
         <input type = 'text' value={this.state.newRoomsName} onChange={this.handleChange.bind(this)} />
         </label>
         <span> {this.state.description} </span>
         <button onClick = {this.state.handleChange}>Submit</button>
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
