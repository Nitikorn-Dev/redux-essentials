import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routers from './router';
import { Navbar } from './app/Navbar'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routers />
      </div>
    </Router>
  )
}

export default App
