import '../../stylingFiles/Notifications.css';
import { apiDomain } from '../../utils/utils'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useContext } from 'react';
import { Context } from '../../context/userContext/userContext';
import moment from 'moment';


function Notifications() {

  const { user } = useContext(Context);

  const [task, setTask] = useState([])

  const getData = async () => {
      const res = await axios.get(`${apiDomain}/tasks`,{
        headers: { 'Authorization': `${user.token}` }, 
      })
      setTask(res.data)
  }
  useEffect(() =>{

      getData()
  }, [])

  return (
    <div className='tasks'>
        <div className="future">
        <div className="title-btn">Future Tasks</div>
         <h6>You have Forthcoming Tasks expected to complete</h6>

          {
           task && task.map((item, index) => (
              <>
                <div className="card" key={index}>
                  <h5>Task Name: { item.TaskName}</h5>
                  <h5>Start Date: { moment(item.StartDate).utc().format('DD/MM/YYYY') }</h5>
                </div>
              </> 
          ))}
          
    
      </div>

      <div className="overdue">
        <div className="title-btn">Overdue Tasks</div>
        <h6>Below Tasks have not been completed on time</h6>
        {
           task && task.map((item, index) => (
              <>
                <div className="card" key={index}>
                  <h5>Task Name: { item.TaskName}</h5>
                  <h5>Close Date was: {moment(item.CloseDate).utc().format('DD/MM/YYYY')}</h5>
                </div>
              </> 
          ))}
      </div>
      
    </div>
  )
}

export default Notifications
