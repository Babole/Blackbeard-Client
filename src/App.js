import { Routes, Route } from 'react-router-dom'
import React, { useEffect, useState } from 'react';

import './App.css';
import { Login, Register, Home, Join, Lobby, GamePage, Scoreboard } from './pages'
import { socket } from './socket/index'

function App() {
  const [gameData, setgameData] = useState(0);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`user connected to the socket id ${socket.id}`);
    });

    socket.on('disconnect', () => {
      console.log('socket disconnected')
    });

    socket.on("change state", (game_Data) => {
      window.localStorage.setItem("gameData", JSON.stringify(game_Data))
      window.dispatchEvent(new Event("storage"));
      setgameData(game_Data)
    })

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('change state');
    };

  }, [])

  useEffect(() => {
    socket.on("user joining waiting room", (joiningData) => {
      if (sessionStorage.getItem('username') === gameData.host.user) {
        if (gameData.players.length < 3) {
          let newGameData = { ...gameData }

          let freeCharacters = ['captain', 'crabby', 'pinkie', 'toothy']
          let assignedCharacters = []
          assignedCharacters.push(newGameData.host.character)
          newGameData.players.forEach(player => assignedCharacters.push(player.character))
          freeCharacters = freeCharacters.filter(val => !assignedCharacters.includes(val));

          joiningData.player.character = freeCharacters[Math.floor(Math.random() * (freeCharacters.length - 0))]
          newGameData.players.push(joiningData.player);
          socket.emit("send state to players", newGameData);
        }
      }
    })

    socket.on('player disconnected', (socketId) => {
      if (sessionStorage.getItem('username') === gameData.host.user) {
        let newGameData = { ...gameData }
        newGameData.players = newGameData.players.filter(player => player.id !== socketId);
        socket.emit("send state to players", newGameData);
      }
    })

    socket.on('host disconnected', () => {
      console.log('allocating new host')
      let newGameData = { ...gameData }
      const indexOfPlayer = newGameData.players.findIndex(player => player.user === sessionStorage.getItem('username'));
      newGameData.host = newGameData.players[indexOfPlayer]
      newGameData.players.splice(indexOfPlayer, 1);
      socket.emit("send state to players", newGameData);
    })

    return () => {
      socket.off('user joining waiting room');
      socket.off('player disconnected');
      socket.off('host disconnected');
    }
  }, [gameData])

  return (
    <>
      <div className='app' role="application">
        <Routes>

          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/join' element={<Join />} />
          <Route path='/lobby' element={<Lobby />} />
          <Route path='/game' element={<GamePage />} />
          <Route path='/scoreboard' element={<Scoreboard />} />
        </Routes>
      </div>
    </>

  );
}

export default App;
