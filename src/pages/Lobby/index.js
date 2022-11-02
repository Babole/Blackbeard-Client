import { React, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

const Lobby = () => {

  const navigate = useNavigate()
  const [gameData, setgameData] = useState(0);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // check if token is valid
  useEffect(() => {

    if(!sessionStorage.getItem('token')){
      navigate("/")
    } else {
      const options = { headers: new Headers({ 'Authorization': sessionStorage.getItem('token') }) }
      // fetch("http://0.0.0.0:5001/token", options)
      fetch("https://black-beard-island.herokuapp.com/token", options)
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

  function storageEventHandler() {
    setgameData(JSON.parse(localStorage.getItem('gameData')) || 0)
  }

  useEffect(() => {
    setgameData(JSON.parse(localStorage.getItem('gameData')) || 0)
    window.addEventListener('storage', storageEventHandler);
  }, []);

  function ifHost() {
    if (gameData.host.user === sessionStorage.getItem('username')) {
      return (<button className='start'>Start game</button>)
    } else {
      return (
        <p className='wait-for-host'>Waiting for host to start the game...</p>
      )
    }
  }

  function handleBackHome() {
    navigate('/home')
  }

  return (
    <>
    {loading ? <h2>Loading ...</h2> :
      <>
      <div role="main">
        {
          !!gameData
            ?
            <>
              <h1>Welcome to Room {gameData.roomID}</h1>
              <h2>Host: {gameData.host.user} <img src={'assets/characters/' + gameData.host.character + '.png'} alt={gameData.host.character}></img></h2>
              <h2>Players (max: 3): </h2>
              <h2><ul>{gameData.players.map(user => { return <li key={user.user}>{user.user} <img src={'assets/characters/' + user.character + '.png'} alt={user.character}></img> </li> })}</ul></h2>
              {gameData.players.length >= 1
                ? ifHost()
                : <p className='game-id'>Two players required to start game...</p>
              }
            </>
            :
            <>
              <h1>Room is full or doesn't exist</h1>
              <button className='start' onClick={handleBackHome}>Get me back home!</button>
            </>
        }
      </div>
      </>
      }
    </>
  )
};

export default Lobby;
