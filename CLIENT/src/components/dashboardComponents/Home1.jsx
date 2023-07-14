import '../../stylingFiles/Home1.css'
import { MdOutlineVerifiedUser } from "react-icons/md"
import { apiDomain } from '../../utils/utils'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useContext } from 'react';
import { ContextUser } from '../../context/userContext/userContext';
import moment from 'moment';

function Home1() {
   
  const { user } = useContext(ContextUser);

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
      <div className="scheduled">
        <div className="title-btn">Scheduled Tasks</div>

          {
           task && task.map((item, index) => (
              <>
                <div className="card" key={index}>
                  <h5>Project: {item.ProjectName}</h5>
                  <h5>Project Manager: {item.ProjectManager}</h5>
                  <h5>Task Name: { item.TaskName}</h5>
                  <h5>Start Date: { moment(item.StartDate).utc().format('DD/MM/YYYY') }</h5>
                  <h5>Close Date: {moment(item.CloseDate).utc().format('DD/MM/YYYY')}</h5>
                </div>
              </> 
          ))}
          
    
      </div>

      <div className="progress">
        <div className="title-btn">Tasks in Progress</div>
        {
           task && task.map((item, index) => (
              <>
                <div className="card" key={index}>
                  <h5>Task Name: { item.TaskName}</h5>
                  <h5>Progress: </h5> 
                  <h5 id='dueDate'>Due in: { moment(item.CloseDate).diff(new Date().toLocaleString(),'days')} Days</h5>

                </div>
              </> 
          ))}
      </div>

      <div className="completed">
       <div className="title-btn">Completed Tasks</div>
       {
           task && task.map((item, index) => (
              <>
                <div className="card" key={index}>
                  <h5>Task Name: { item.TaskName}</h5>
                  <h5 id='complete'>Status: Completed <MdOutlineVerifiedUser/></h5> 
                </div>
              </> 
          ))}
      </div>
    </div>
  )
}

export default Home1
