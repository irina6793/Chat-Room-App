import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    }
    this.roomsRef = this.props.firebase.database().ref('Rooms');
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
       <ul>
       {
         this.state.rooms.map((room, i) => {
        return (
          <li key ={i}>
          <span>Test!</span>
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
