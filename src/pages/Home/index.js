import { React, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import { socket } from '../../socket/index.js'

const Home = () => {


    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    // check if token is valid
    useEffect(() => {

        if (!sessionStorage.getItem('token')) {
            navigate("/")
        } else {
            const options = { headers: new Headers({ 'Authorization': sessionStorage.getItem('token') }) }
            // fetch("http://0.0.0.0:5001/token", options)
            fetch("https://black-beard-island.herokuapp.com/token", options)
                .then(res => {
                    if (!res.ok) {
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
            window.location.reload();
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
        let freeCharacters = ['captain', 'crabby', 'pinkie', 'toothy']
        const gameData = {
            roomID: roomID,
            host: {
                id: socket.id,
                user: sessionStorage.getItem('username'),
                character: freeCharacters[Math.floor(Math.random() * (freeCharacters.length - 0))]
            },
            players: [],
            gameStarted: false
        }
        socket.emit("create game", gameData);
        navigate('/lobby')
    }

    function handleJoinGame() {
        navigate('/join')
    }

    return (
      <div role="main">
        {loading ? <h2>Loading ... </h2> :
        <>
          <div className='create home-btn' onClick={handleCreateGame}
          aria-label="Create Game Button"
          >Create Game</div>
          <div className='join home-btn' onClick={handleJoinGame}>Join Game</div>
          <div className='scores home-btn' onClick={() => { navigate('/scoreboard') }}>Leaderboard</div>

          <div className='scoreboard-btn scoreboard-text' style={{position: 'fixed', right:'6rem', top: '3.5rem', fontSize: '0.8rem'}} onClick={()=>{sessionStorage.clear();
        navigate("/")}}>Logout</div>
        </>
        }
      </div>
    )
};

export default Home;