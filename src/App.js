import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.css';
import { Login, Register, Home, Create, Join, Lobby, GamePage } from './Pages'
import { storeSocket } from './actions/gameStateActions'

const io = require('socket.io-client')
const ENDPOINT = 'https://black-beard-island.herokuapp.com/'

function App() {
  const [socket, setSocket] = useState();
  const dispatch = useDispatch()

  useEffect(() => {
    const newSocket = io(ENDPOINT)

    newSocket.on("connect", () => {
      console.log(`user connected to the socket id ${newSocket.id}`);
      // socket.emit('connect', {data: 'I\'m connected!'})
    });

    dispatch(storeSocket(newSocket))
    setSocket(newSocket)
  }, [])

  return (
    <div role="application">
      <Routes>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/join' element={<Join />} />
        <Route path='/lobby' element={<Lobby />} />
        <Route path='/game' element={<GamePage />} />
      </Routes>
    </div>
  );
}

export default App;
