import { React, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import { socket } from '../../socket/index.js'

const Home = () => {

  
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  // check if token is valid
  useEffect(() => {

    if(!sessionStorage.getItem('token')){
      navigate("/")
    } else {
      const options = { headers: new Headers({ 'Authorization': sessionStorage.getItem('token') }) }
      // fetch("http://0.0.0.0:5001/users", options)
      fetch("https://black-beard-island.herokuapp.com/users", options)
        .then(res => {
          if (!res.ok){
            handleLogout()
          } else {
            setLoading(false)
          }
        })
      }
      const handleLogout = () => {
        sessionStorage.clear();
        navigate("/")
      }
      
    })
    
    

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

  const renderPage = () => {
    return(
      <>
      <div className="box">
        <button className='create' onClick={handleCreateGame}>CreateGame</button>
      </div>
      <div className="box">
        <button className='join' onClick={handleJoinGame}>JoinGame</button>
      </div>
      </>
    )
  }

  return (
    <div role="main">
      {loading ? <h2>Loading ... </h2> : renderPage()}
      
    </div>
  )
};

export default Home;
