import {React, useState } from "react"
import { socket } from '../../socket/index.js'

const Create = () => {
    const [room, setRoom] = useState()
    console.log(room)
    
    // useEffect(() => {
    //     socket.emit("lobby", gameDetails.roomName)
    //     socket.on("playerData", (players, host) => {
    //       setPlayerDetails(players)
    //       setHost(host)
    //     })
    //     socket.on("begin", (data) => navigate('/questions', {state: {data, gameDetails}}))
    //   }, [navigate, gameDetails])

    const handleSubmit = (e) => {
        e.preventDefault()
        let username = document.getElementById('username').value
        let roomID = document.getElementById('roomID').value
        const gameDetails =  {
            roomID: roomID,
            username: username,
        }
        console.log(gameDetails)
        sessionStorage.setItem("roomID", roomID)
        sessionStorage.setItem("username", username)
        //  Check if room ID is available
        if (roomID !== "") {
            socket.emit("create", gameDetails, (res) => {
            
            console.log("socket response", res);
    
            if (res.code === "success") {
                console.log(`redirect user to Lobby`)
                
                // Navigate('/lobby', {state: {gameDetails}})
            } else {
                setRoom('');
            }
            })
        }
        createRoom()
    }

    function createRoom(){
        let username = document.getElementById('username').value
        let roomID = document.getElementById('roomID').value
        const data = {}
        data.roomID = roomID
        data.creator= username
        console.log(data)
        
        socket.emit("create", data)
        username.value = ''
        roomID.value = ''
    }
    

  return (
    <div>
      <div className="content-section">
        <h1>Create a new Game</h1>
        <form action="" >
            <label htmlFor="username">Input username: </label>
            <input type="text" name="username" id="username"></input>
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
