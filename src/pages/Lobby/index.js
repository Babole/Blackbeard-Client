import { React, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

const Lobby = () => {

  const [gameData, setgameData] = useState(0);
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate();

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
          {loading ? <h2>Loading ... </h2> : 
          <>
          <h1>Welcome to Room {gameData.roomID}</h1>
          <h2>Host: {gameData.host.user}</h2>
          <h2>Players: </h2>
          <h2><ul>{gameData.players.map(user => { return <li key={user.user}>{user.user}</li> })}</ul></h2>
          </>
        }
        </div>
      }
    </>
  )
};

export default Lobby;
