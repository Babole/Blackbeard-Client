import {React } from "react"
import { socket } from '../../socket/index.js'
import { useNavigate } from "react-router-dom";

const Join = () => {
    // const [roomID, setRoomID] = useState()
    // const [username, setUsername] = useState()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const username = sessionStorage.getItem('username')
        // setUsername(username)
        const roomID = document.getElementById('roomID').value
        // setRoomID(roomID)
        const gameDetails =  {
            roomID: roomID,
            username: username,
        }
        console.log(gameDetails)
        
        //  Check if room ID is available
        if (roomID !== "") {
            socket.emit("join", gameDetails, () => {
              if (!false){
                sessionStorage.setItem("roomID", roomID)
                sessionStorage.setItem("username", username)
                navigate('/lobby', {state: {gameDetails}})

              } else {
                
                alert("This room does not exist")

              }
            })
        } else {
          alert('please input a room ID')
        }
    }

  return (
    <div className="menu-img-l" role="main">
      <div className="content-section container-join">
        <h1>Join a Game</h1>
        <form action="" >
            <label htmlFor="roomID">Input Room ID: </label>
            <input type="text" name="roomID" id="roomID"></input>
            <button onClick={handleSubmit}>Join</button>
                
        </form>
      </div>
    </div>
  )
};

export default Join;
