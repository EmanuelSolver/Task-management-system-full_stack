import '../../stylingFiles/sideNav.css'
import { ImHome } from 'react-icons/im'
import { GoGraph } from 'react-icons/go'
import { LuCalendarDays } from 'react-icons/lu'
import { MdOutlineNotificationImportant } from 'react-icons/md'
import {PiProjectorScreenFill } from 'react-icons/pi'
import { FiSettings } from 'react-icons/fi'
import { AiOutlinePoweroff } from 'react-icons/ai'
import { GrDiamond } from "react-icons/gr";
import { Context } from '../../context/navigationContext/Context'
import { useContext } from 'react'

export function SideNav() {
    const { dispatch } = useContext(Context)
    

    const handleHome = () =>{

        dispatch({type: 'HOME', payload: 'home'})
    }
    const handleNotifications = () =>{

        dispatch({type: 'NOTIFICATIONS', payload: 'notifications'})
    }
    const handleProjects = () =>{

        dispatch({type: 'PROJECTS', payload: 'projects'})
    }
    const handleAnalytics = () =>{

        dispatch({type: 'ANALYTICS', payload: 'analytics'})
    }
    const handleCalendar = () =>{
        dispatch({type: 'CALENDAR', payload: 'calendar'})

    }
    const handleSettings = () =>{

        dispatch({type: 'SETTINGS', payload: 'settings'})
    }
    
    const handleLogout = () =>{
        //logout dispatch here
        
    }
    
  return (
    <div className="sidenav">
        <div className="logo"><GrDiamond /> TManager </div>
        <div className="sidenav-wrapper">
            <div className="sidenav-item" onClick={handleHome}><ImHome/> Home</div>
            <div className="sidenav-item" onClick={handleNotifications}><MdOutlineNotificationImportant/> Notifications</div>
            <div className="sidenav-item" onClick={handleProjects}><PiProjectorScreenFill /> Projects</div>
            <div className="sidenav-item" onClick={handleCalendar}><LuCalendarDays/> Calendar</div>
            <div className="sidenav-item" onClick={handleAnalytics}><GoGraph/> Analytics</div> <br /><br />
            <div className="sidenav-item" onClick={handleSettings}><FiSettings/> Settings</div>
            <div className="sidenav-item" onClick={handleLogout}><AiOutlinePoweroff/> Logout</div>
        </div>
    
    </div>
  )
}

export default SideNav
