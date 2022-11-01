import { React, useState, useEffect } from "react"
import { socket } from "../../socket";
import { useLocation } from 'react-router-dom';

const Lobby = () => {

  const [gameData, setgameData] = useState(0);

  function storageEventHandler() {
    setgameData(JSON.parse(localStorage.getItem('gameData')) || 0)
  }

  useEffect(() => {
    setgameData(JSON.parse(localStorage.getItem('gameData')) || 0)
    window.addEventListener('storage', storageEventHandler);
  }, []);

  return (
    <>
      {
        !!gameData &&
        <div role="main">
          <h1>Welcome to Room {gameData.roomID}</h1>
          <h2>Host: {gameData.host.user}</h2>
          <h2>Players: </h2>
          <h2><ul>{gameData.players.map(user => { return <li key={user.user}>{user.user}</li> })}</ul></h2>
        </div>
      }
    </>
  )
};

export default Lobby;
