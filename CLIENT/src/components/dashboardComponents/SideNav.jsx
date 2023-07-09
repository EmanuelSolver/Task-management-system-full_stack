import '../stylingFiles/sideNav.css'
import { CgProfile } from 'react-icons/cg'
import { FaBookReader } from 'react-icons/fa'
import { FaMoneyCheckAlt } from 'react-icons/fa'
import { GrUpdate } from 'react-icons/gr'
import { Context } from '../context/studentContext/context'
import { useContext } from 'react'

export function SideNav() {
    const { dispatch } = useContext(Context)

    const handleHome = () =>{

        dispatch({type: 'HOME', payload: 'home'})
    }
    const handleNotifications = () =>{

        dispatch({type: 'NOTIFICATIONS', payload: 'notifications'})
    }
    const handleAnalytics = () =>{

        dispatch({type: 'ANALYTICS', payload: 'analytics'})
    }
    const handleSettings = () =>{

        dispatch({type: 'SETTINGS', payload: 'settings'})
    }
    
    const handleLogout = () =>{
        //logout dispatch here
    }
    
  return (
    <div className="sidenav">
        <div className="sidenav-wrapper">
            <div className="sidenav-title" onClick={handleHome}><CgProfile/> Home</div>
        </div>
        
        <div className="sidenav-wrapper">
            <div className="sidenav-item" onClick={handleNotifications}><FaMoneyCheckAlt/> Notifications</div>
            <div className="sidenav-item" onClick={handleAnalytics}><FaBookReader/> Analytics</div>
            <div className="sidenav-item" onClick={handleSettings}><GrUpdate/> Settings</div>
            <div className="sidenav-item" onClick={handleLogout}><GrUpdate/> Logout</div>


        </div>
    
    </div>
  )
}

export default SideNav
