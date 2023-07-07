import './App.css'
import Home from './pages/Home'
import Header from './components/Header'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import UpdatePassword from './pages/UpdatePassword'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {

  return (
    <>
      <BrowserRouter>
          <Header />

          <Routes>          
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Register />} />
            
          </Routes>
          <UpdatePassword />
      </BrowserRouter>
    </>
  )
}

export default App
