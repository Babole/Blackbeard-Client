import { React } from "react"
import { socket } from '../../socket/index.js'
import { useNavigate } from "react-router-dom";

const Join = () => {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const roomID = document.getElementById('roomID').value

    //  Check if room ID is available
    if (roomID.length === 6) {
      const joiningData = {
        roomID: roomID,
        player: {
          id: socket.id,
          user: sessionStorage.getItem('username')
        }
      }
      socket.emit("join game", joiningData)
      navigate('/lobby')
    } else {
      alert('please input a valid room ID')
    }
  }

  return (
    <div role="main">
      <div className='scoreboard-btn scoreboard-text' style={{ position: 'fixed', right: '6rem', top: '3.5rem' }} onClick={() => { navigate('/home') }}>Home</div>
      <div className="content-section menu-img-l">
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
