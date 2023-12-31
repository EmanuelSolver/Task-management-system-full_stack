import '../../stylingFiles/sideNav.css'
import { ImHome } from 'react-icons/im'
import { GoGraph } from 'react-icons/go'
import { BsFillFilterSquareFill } from 'react-icons/bs'
import { MdOutlineNotificationImportant } from 'react-icons/md'
import {PiProjectorScreenFill } from 'react-icons/pi'
import { FiSettings } from 'react-icons/fi'
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
    const handleFilter = () =>{
        dispatch({type: 'FILTER', payload: 'filter'})

    }
    const handleSettings = () =>{

        dispatch({type: 'SETTINGS', payload: 'settings'})
    }
    
 
  return (
    <div className="sidenav">
        <div className="logo"><GrDiamond /> TManager </div>
        <div className="sidenav-wrapper">
            <div className="sidenav-item" onClick={handleHome}><ImHome/> Home</div>
            <div className="sidenav-item" onClick={handleNotifications}><MdOutlineNotificationImportant/> Notification</div>
            <div className="sidenav-item" onClick={handleProjects}><PiProjectorScreenFill /> Projects</div>
            <div className="sidenav-item" onClick={handleFilter}><BsFillFilterSquareFill/> Filter Tasks</div>
            <div className="sidenav-item" onClick={handleAnalytics}><GoGraph/> Analytics</div>
            <div className="sidenav-item" onClick={handleSettings}><FiSettings/> Settings</div>
        </div>
    
    </div>
  )
}

export default SideNav
