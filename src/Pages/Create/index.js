import { React, useState } from "react"
import { socket } from '../../socket/index.js'
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [roomID, setRoomID] = useState()
  // const [username, setUsername] = useState()
  console.log(roomID)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const username = sessionStorage.getItem('username')
    // setUsername(username)
    let roomID = document.getElementById('roomID').value
    setRoomID(roomID)
    const gameDetails = {
      roomID: roomID,
      host: username,
    }
    console.log(gameDetails)
    //  Check if room ID is available
    if (roomID !== "") {
      socket.emit("create", gameDetails, (req) => {

        console.log("socket response");
        sessionStorage.setItem("roomID", roomID)
        sessionStorage.setItem("username", username)

        // if (res.code === "success") {
        //     console.log(`redirect user to Lobby`)

        navigate('/lobby', { state: { gameDetails } })
        // } else {
        //     setRoomID('');
        // }
      })
    } else {
      alert('please input a room ID')
    }
  }

  return (
    <div role="main">

      <div className="content-section">
        <h1>Create a new Game</h1>

        <form action="" >
          <label htmlFor="roomID">Create new Room: </label>
          <input type="text" name="roomID" id="roomID"></input>
          <button onClick={handleSubmit}>Submit</button>
        </form>

      </div>
    </div>
  )
};

export default Create;
