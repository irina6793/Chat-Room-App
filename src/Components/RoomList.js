import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: '',

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
    const target = e.target
    const name = target.name
    this.setState({
      [e.target.name]: e.target.value
    });
  }

   render() {
     return (
       <div className = 'rooms'>
       <legend>newRoomName</legend>
       <form onSubmit={e => {

       }

       }


       {this.handleSubmit}>
       <label>
       <input
         type = 'text'
         onChange={this.handleChange}
         value={this.state.newRoomName}
         />
         </label>
       <button type = 'submit' value='Submit'>Add</button>
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
