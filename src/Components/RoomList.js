import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    };
  }
   render() {
     return (
       <div className="RoomList">
       <h1>Room List </h1>
       </div>
     );
   }
 }

 export default RoomList;
