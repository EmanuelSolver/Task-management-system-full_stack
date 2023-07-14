import '../../stylingFiles/Header1.css'
import { AiOutlinePoweroff } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { useContext } from 'react'
import { Context } from '../../../src/context/navigationContext/Context'
import { ContextUser} from '../../context/userContext/userContext'

function Header1() {
  const { navigator } = useContext(Context)
  const { dispatch } = useContext(ContextUser)

  const handleLogout = () =>{
    //logout dispatch here
    dispatch({type: 'LOGOUT'})
}

  
  const capitalized = navigator.charAt(0).toUpperCase() + navigator.slice(1)
  let title = ''
  navigator == 'home' ? title = 'Track your Tasks'
   : navigator == 'notifications' ? title = 'Task Status'
   : navigator == 'analytics' ? title = 'Analysis of Tasks Progress'
   : navigator == 'projects' ? title = 'Create New Tasks'
   : navigator == 'calendar' ? title = 'Schedule on Calendar'
   : navigator == 'settings' ? title = 'Settings'
   : null;

  return (
    <>
    <div className="dashHeader">
      <div className='head'> {capitalized} </div>
      <div className="searchBar"><BsSearch/>  <input type="text" placeholder='search task'/></div> 
      <div className="logout" onClick={handleLogout}><AiOutlinePoweroff/> Logout</div>
    </div>
    <div className="title">
      <h3>{ title }</h3>
    </div>
    </>  
  )
}

export default Header1
