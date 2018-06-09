import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: ''
    }
    this.roomsRef = this.props.firebase.database().ref('Rooms');
   }

  componentDidMount() {
       this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       this.setState({ rooms: this.state.rooms.concat( room ) });
     });
  }

  createRoom(newRoomName) {
    this.roomsRef.push({
      name: newRoomName
   });
  }

   render() {
     return (
       <div className = 'rooms'>
       <form className = 'rooms-form'>
       <fieldset>
       <legend>newRoomName</legend>
       <input type = 'text' placeholder ='Name' />
       <button type = 'submit' className='rooms-button rooms-button-createRoom'>Add</button>
       </fieldset>
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
