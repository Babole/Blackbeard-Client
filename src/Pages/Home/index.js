import { React, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import { socket } from '../../socket/index.js'

const Home = () => {

  const navigate = useNavigate()

  useEffect(() => {
    if (!!localStorage.getItem('gameData')) {
      localStorage.clear();
    }
  }, [])

  function roomIdGenerator() {
    const chars = "0123456789".split("");
    let result = "";
    for (let i = 0; i < 6; i++) {
      const x = Math.floor(Math.random() * chars.length);
      result += chars[x];
    }
    return result;
  }

  function handleCreateGame() {
    let roomID = roomIdGenerator()
    const gameData = {
      roomID: roomID,
      host: {
        id: socket.id,
        user: sessionStorage.getItem('username')
      },
      players: []
    }
    socket.emit("create game", gameData);
    navigate('/lobby')
  }

  function handleJoinGame() {
    navigate('/join')
  }

  return (
    <div role="main">

      <div className="box">
        <button className='create' onClick={handleCreateGame}>CreateGame</button>
      </div>
      <div className="box">
        <button className='join' onClick={handleJoinGame}>JoinGame</button>
      </div>
    </div>
  )
};

export default Home;