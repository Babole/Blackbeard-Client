import React from "react"
import './style.css'

const Home = () => {

  return (
    <div role="main">
        <div className="menu-img">
          <div className="container">
            <a href="/create">Create New Game</a>
          </div>
        </div>
        <div className="menu-img">
          <div className="container">
            <a href="/join">Enter Game</a>
          </div>
        </div>
    </div>
  )
};

export default Home;
