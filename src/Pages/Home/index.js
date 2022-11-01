import React from "react"
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate()

  function handleCreateGame() {
    navigate('/create')
  }

  function handleJoinGame() {
    navigate('/join')
  }

  return (
    <div role="main">

        <div className="box">
          <button className='create' onClick={handleCreateGame}>CreateGame</button>
          {/* <a href="/create">Create New Game</a> */}
        </div>
        <div className="box">
          <button className='join' onClick={handleJoinGame}>JoinGame</button>
          {/* <a href="/join">Enter Game</a> */}
        </div>
    </div>
  )
};

export default Home;
