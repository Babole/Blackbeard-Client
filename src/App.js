import './App.css';
import { Login, Register, Home, Create, Join, Lobby, GamePage } from './pages'

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div role="application">
      <Routes>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />}/>
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
