import React from "react"

const Create = () => {

    var server_URL = 'http://127.0.0.1:5000'
    var socket = io.connect(`${server_URL}`);

    const handleSubmit = () => {
        // let username = document.getElementById('username').value
        let roomID = document.getElementById('roomID').value
        sessionStorage.setItem("roomID", roomID)
        createRoom
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
        <form action="/lobby" method="POST">
            <label htmlFor="username">Input username: </label>
            <input type="text" name="username" id="username"></input>
            <label htmlFor="roomID">Create new Room: </label>
            <input type="text" name="roomID" id="roomID"></input>
            <button><a href="/lobby" onClick={handleSubmit}>Submit</a></button>
        </form>


      </div>
    </div>
  )
};

export default Create;
