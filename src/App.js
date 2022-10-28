import './App.css';
import { Login, Register } from './Pages'

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div role="application">
      <Routes>
        <Route path='login' element={<Login />}>Login</Route>
        <Route path='register' element={<Register />}>Register</Route>
      </Routes>
    </div>
  );
}

export default App;
