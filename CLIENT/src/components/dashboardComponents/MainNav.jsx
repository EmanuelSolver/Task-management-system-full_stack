import Header1 from "./Header1"
import Home1 from "./Home1"
import Analytics from "./Analytics"
import Notifications from "./Notifications"
import Settings from "./Settings"
import { Context } from '../../../src/context/navigationContext/Context'
import { useContext } from 'react'

function MainNav() {
    const { navigator } = useContext(Context)

  return (
    <div>
        <h1>Task Dashboard</h1>
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
