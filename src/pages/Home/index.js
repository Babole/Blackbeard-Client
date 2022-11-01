import React from "react"

const Home = () => {

  return (
    <div role="main">
        <div className="menu-img">
          <div className="container-home">
            <a href="/create">Create New Game</a>
          </div>
        </div>
        <div className="menu-img">
          <div className="container-home">
            <a href="/join">Enter Game</a>
          </div>
        </div>
    </div>
  )
};

export default Home;
