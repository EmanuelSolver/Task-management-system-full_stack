import { BsPersonCircle } from "react-icons/bs"
import { MdOutlineVerifiedUser } from "react-icons/md"
import { RiArrowRightDoubleLine } from "react-icons/ri"

function Home() {
  return (
    <div>
      <div className="container">
          <h1 className="heading">Welcome Here</h1>

          <div className="content">
           
            <div>
                <h3>Dont be caught up by Deadlines, Manage your Tasks Efficiently with TManager</h3>
                <p>Sign up with us and we will be glad to have you on board</p>
                <button className="button">Try for free <RiArrowRightDoubleLine/></button>
            </div>

          </div>

          <div>
            <div className="left-circle"> <BsPersonCircle /> </div> 
                <div className="left-description1"> 
                <h3>500+</h3> 
                <p>Active users of our system</p>
                </div>
            <div className="right-circle"> <MdOutlineVerifiedUser/></div>
                <div className="right-description2"> 
                <h3>©️2023</h3>
                <p>Copyright</p>
                </div>

          </div>
        </div>
    </div>
  )
}

export default Home
