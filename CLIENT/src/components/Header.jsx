import { Link } from 'react-router-dom'
import '../stylingFiles/Header.css'
import { useContext } from 'react'
import { Context } from '../context/userContext/userContext'
//icons
import { GrDiamond } from "react-icons/gr";

function Header() {
  const { user } = useContext(Context)

  return (
    <div>
      {
        !user &&(
            <nav className='navbar'>
              
              <div className='navbar-container'>
                <Link to="/" className='navbar-logo'>
                  <GrDiamond /> TManager 
                </Link>
              </div>

            
              <div className='nav-item'>
                  <button><Link to="/" className='nav-links' > Home </Link></button>
                  <button><Link to="/about" className='nav-links' > About </Link></button>
                  <button><Link to="/login" className='nav-links'> Login </Link></button>
                  <Link to="/signup" className='signUp-link' >Sign Up </Link>
                    
              </div>      
                
            </nav>
          ) 

      }         
      
    </div>
  )
}

export default Header
