import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomsName: '',

    }
    this.handleChange = this.handleChange.bind(this);
    this.roomsRef = this.props.firebase.database().ref('rooms');
   }

   handleChange(e) {
     this.setState({newRoomsName: e.target.value});
   }

   handleSubmit(e) {
     e.preventDefault();
     if (this.state.newRoomsName)
     {
       this.setState({newRoomsName: ''});
       this.roomsRef.push({
       name: this.state.newRoomsName,
       })
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
            <li onClick= {this.handleClick}>
              key ={i.this}>
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
