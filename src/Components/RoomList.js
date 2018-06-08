import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    }
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
       this.roomsRef.on('child_added', snapshot => {
         const room = snapshot.val();
         room.key = snapshot.key;
         this.setState({ rooms: this.state.rooms.concat( room ) });

       });
     }


   render() {
     return (
       <div className = 'rooms'>
       <h1> Welcome to Bloc Chat </h1>
       <ul>
       {
         this.state.room.map((room, i) => {
        return (
          <li key={i}>
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
