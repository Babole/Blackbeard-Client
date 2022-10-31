import React from "react"

const Home = () => {

  return (
    <div>

        <div style={{border: '1px solid black', margin: '3rem', padding: '2rem'}}>
          <a href="/create">Create New Game</a>
        </div>
        <div style={{border: '1px solid black', margin: '3rem', padding: '2rem'}}>
          <a href="/join">Enter Game</a>
        </div>
    </div>
  )
};

export default Home;
