import React from 'react'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import About from './Components/About'
import Projects from './Components/Projects'
import Contact from './Components/Contact'
import Footer from './Components/Footer'


function App() {
    
  return (
    <div>
        <Navbar />
        <Home />
        <About />
        <Projects />
        <Contact />
        <Footer />
    </div>
  )
}

export default App