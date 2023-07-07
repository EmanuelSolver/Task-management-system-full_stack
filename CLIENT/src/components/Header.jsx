import { Link } from 'react-router-dom'
import '../stylingFiles/Home.css'

//icons
import { GrDiamond } from "react-icons/gr";

function Header() {
  return (
    <div>
            <nav className='navbar'>
              <div className='navbar-container'>
                <Link to="/" className='navbar-logo'>
                  <GrDiamond /> TManager 
                </Link>
            
              </div>

              <ul >
                <li className='nav-item'>
                    <button><Link to="/" className='nav-links' > Home </Link></button>
                    <button><Link to="/about" className='nav-links' > About </Link></button>
                    <button><Link to="/login" className='nav-links'> Login </Link></button>
                    <button><Link to="/signup" className='nav-links' > Sign Up </Link></button>
                    
                </li>
              </ul>
          </nav>
      
    </div>
  )
}

export default Header
