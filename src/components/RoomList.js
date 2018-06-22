import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomsName: '',
      activeRoom: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.roomsRef = this.props.firebase.database().ref('rooms');
   }

   handleChange(rooms) {
     this.setState({newRoomsName: rooms.target.value});
   }

   handleSubmit(e) {
     e.preventDefault();
     if (this.state.newRoomsName)
     {
       this.setState({newRoomsName: ''});
       this.roomsRef.push({
       name: this.state.newRoomsName,
       })
       this.prop.setRoom(
         name= this.state.activeRoom,
         roomId: ''
       )
     }
}

  componentDidMount() {
       this.roomsRef.on('child_added', snapshot => {
       const rooms = snapshot.val();
       this.setState({ rooms: this.state.rooms.concat( rooms ) });
    });

  }




   render() {
     return (
       <div className = 'rooms'>
       <input type="text" value={this.state.newRoomsName} onChange={this.handleChange.bind(this)} />
       <form onSubmit={ (e) => this.handleSubmit(e) }>
       <button type="submit">Submit</button>
       <label>
         Room:
        </label>
         <span> {this.state.description} </span>
       </form>
       <ul>
         {
           this.state.rooms.map((room, i) => {
          return (
            <li key={i} onClick={() => this.props.setRoom(roomId)} >
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
