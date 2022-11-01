import {React, useState, useEffect } from "react"
import { socket } from "../../socket";
import { useLocation } from 'react-router-dom';

const Lobby = () => {

    const [gameDetails, setGameDetails] = useState()

    const [players, setPlayers] = useState([])
    const [hostName, setHost] = useState("")
    var location = useLocation();
    const roomID = sessionStorage.getItem('roomID')
    console.log(gameDetails)
    
    useEffect(() => {
      console.log(`running useEffect`)
      
      const gameDetails = location.state.gameDetails
      setGameDetails(gameDetails)
      socket.emit("lobby", gameDetails)
      console.log(`sent lobby socket`)

      socket.on("message", function (host, players) {
          setHost(host)
          setPlayers(players)
        })

      console.log(players)
      console.log('lobby emitted')
      
    }, [])
    
    const lobbyPlayers = players.map(player => {

      console.log(player)
      return(
        <div>
          <li>{player}</li>
        </div>
      )
      })
    


  return (
    <div role="main">
      <h1 data-testid="greeting">Welcome to Room {roomID}</h1>
      <h2>Host: {hostName}</h2>
      <h2>Players: </h2>
      <h2><ol>{players != null ? lobbyPlayers: <p>No players yet</p> }</ol></h2>
    </div>
  )
};

export default Lobby;
