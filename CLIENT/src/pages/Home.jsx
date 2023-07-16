import { BsPersonCircle } from "react-icons/bs"
import { MdOutlineVerifiedUser } from "react-icons/md"
import { RiArrowRightDoubleLine } from "react-icons/ri"
import { Link } from "react-router-dom"
import '../stylingFiles/Home.css'

function Home() {
  return (
    <div>
      <div className="container">
          <h1 className="heading">Welcome to TManager</h1>
           
            <div className="content">
                <div className='left'>
                  <h2>Dont be caught up by Deadlines, Manage your Tasks Efficiently with TManager</h2>
                  <h5>Sign up with us and we will be glad to have you on board</h5>
                  <Link to="/signup" className="button"> Try for free <RiArrowRightDoubleLine/></Link> 
                </div>
                <div className='right'>
                  <img src='/logo.png' alt='logo'/>
                </div>
            </div> 

          <div className="footer">
              <div className="left-circle"> <BsPersonCircle /> </div> 
                <div className="left-description1"> 
                <h3>500+</h3> 
                <h4>Active users of our system</h4>
                </div>
              <div className="right-circle"> <MdOutlineVerifiedUser/></div>
              <div className="right-description2"> 
                <h3>©️2023</h3>
                <h4>Copyright</h4>
              </div>

          </div>
        </div>
    </div>
  )
}

export default Home
