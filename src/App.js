import './App.css';
import { Login, Register, Home, Create, Lobby } from './Pages'

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path='login' element={<Login />}>Login</Route>
        <Route path='register' element={<Register />}>Register</Route>
        <Route path='Home' element={<Home />}>Home</Route>
        <Route path='Create' element={<Create />}>Create</Route>
        <Route path='Lobby' element={<Lobby />}>Lobby</Route>
      </Routes>
    </>
  );
}

export default App;
