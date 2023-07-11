import './App.css'
import Home from './pages/Home'
import Header from './components/Header'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from './context/userContext/Context'

function App() {
  const { user } = useContext(Context)

  return (
    <>  
      <div className='main-output'>
        <BrowserRouter>
            <Header />
            <Routes>          
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signUp' element={<Register />} />
              <Route path="/dashboard" element={ user ? <Dashboard /> : <Login/>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            
        </BrowserRouter>
      </div>
    </>
    
  )
}

export default App
