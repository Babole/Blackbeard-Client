import {React, useState } from "react"
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
        const gameDetails =  {
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
                
                navigate('/lobby', {state: {gameDetails}})
            // } else {
            //     setRoomID('');
            // }
            })
        } else {
          alert('please input a room ID')
        }
    }

  return (
    <div className="menu-img-l" role="main">
      <div className="content-section container-create">
        <h1>Create a new Game</h1>
        <form action="" >
            {/* <label htmlFor="username">Input username: </label>
            <input type="text" name="username" id="username"></input> */}
            <label htmlFor="roomID">Create new Room: </label>
            <input type="text" name="roomID" id="roomID"></input>
            <button onClick={handleSubmit}>Submit</button>
                {/* <a href="/lobby" onClick={handleSubmit}> */}
                {/* Submit</a> */}
                
        </form>


      </div>
    </div>
  )
};

export default Create;
