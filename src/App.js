import './App.css';
import { Login, Register, GamePage } from './pages'

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/game' element={<GamePage />} />
      </Routes>
    </>
  );
}

export default App;
