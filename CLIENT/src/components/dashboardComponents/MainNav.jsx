import Header1 from "./Header1"
import Home1 from "./Home1"
import Analytics from "./Analytics"
import Filter from "./Filter"
import Notifications from "./Notifications"
import Projects from "./Projects"
import Settings from "./Settings"
import { Context } from '../../../src/context/navigationContext/Context'
import { useContext } from 'react'
import '../../stylingFiles/mainNav.css'


function MainNav() {
    const { navigator } = useContext(Context)

  return (
    <div className="mainNav">
        <Header1 />
        {
            navigator == 'home' ? (
                <div className='mainnav-wrapper'>
                    <Home1 />
                </div>
            ): navigator == 'notifications' ? (
                <div className='mainnav-wrapper'>
                    <Notifications />
                </div>
            ): navigator == 'projects' ? (
                <div className='mainnav-wrapper'>
                    <Projects />
                </div>
            ): navigator == 'filter' ? (
                <div className='mainnav-wrapper'>
                    <Filter />
                </div>
            ): navigator == 'analytics' ? (
                <div className='mainnav-wrapper'>
                    <Analytics />
                </div>
            ): navigator == 'settings' ? (
                <div className='mainnav-wrapper'>
                    <Settings />
                </div>

            ): null
        }
      
    </div>
  )
}

export default MainNav
