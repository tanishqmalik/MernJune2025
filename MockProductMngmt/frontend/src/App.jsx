// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import './App.css'
import DashBoard from './pages/DashBoard'


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
      </Routes>
    
    </Router>
  )
}

export default App
