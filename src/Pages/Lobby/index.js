import {React, useState} from "react"

const Lobby = () => {

    // const [room, setRoom] = useState()
    const roomID = sessionStorage.getItem('roomID')
    // setRoom(roomID)


  return (
    <div>
      <h1>Welcome to Room {roomID}</h1>
      <h2>Players: </h2>
    </div>
  )
};

export default Lobby;
