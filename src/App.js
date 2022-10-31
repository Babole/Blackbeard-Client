import './App.css';
import { Login, Register, Home, Create, Join, Lobby, GamePage } from './Pages'

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div role="application">
      <Routes>

        <Route path='login' element={<Login />}>Login</Route>
        <Route path='register' element={<Register />}>Register</Route>
        <Route path='Home' element={<Home />}>Home</Route>
        <Route path='Create' element={<Create />}>Create</Route>
        <Route path='Join' element={<Join />}>Create</Route>
        <Route path='Lobby' element={<Lobby />}>Lobby</Route>
        <Route path='Game' element={<GamePage />} />
      </Routes>
    </div>
  );
}

export default App;
