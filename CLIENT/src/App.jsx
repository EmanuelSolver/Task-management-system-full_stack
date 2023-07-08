import './App.css'
import Home from './pages/Home'
import Header from './components/Header'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {

  return (
    <div className='main-output'>
      <BrowserRouter>
          <Header />

          <Routes>          
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Register />} />
          </Routes>
          
      </BrowserRouter>
    </div>
  )
}

export default App
