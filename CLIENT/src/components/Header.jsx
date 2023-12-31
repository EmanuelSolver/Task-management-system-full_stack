import { Link } from 'react-router-dom'
import '../stylingFiles/Header.css'
import { GrDiamond } from "react-icons/gr";

function Header() {
  // const { user } = useContext(ContextUser)

  return (
    <div>
      {
            <nav className='navbar'>
              
              <div className='navbar-container'>
                <Link to="/" className='navbar-logo'>
                  <GrDiamond /> TManager 
                </Link>
              </div>

            
              <div className='nav-item'>
                  <Link to="/" className='nav-links' > Home </Link>
                  <Link to="/about" className='nav-links' > About </Link>
                  <Link to="/login" className='nav-links'> Login </Link>
                  <Link to="/signup" className='signUp-link' >Sign Up </Link>
                    
              </div>      
                
            </nav>    

      }         
      
    </div>
  )
}

export default Header
