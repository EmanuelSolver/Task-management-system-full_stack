import '../../stylingFiles/filter.css'
import { apiDomain } from '../../utils/utils'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useContext } from 'react';
import { ContextUser } from '../../context/userContext/userContext';
import moment from 'moment';
// import {toast, ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function Filter() {     
  const { user } = useContext(ContextUser);
  const [project, setProject] = useState([])
  const [priorityTask, setPriorityTask] = useState([])
  const [projectTask, setProjectTask] = useState([])
  const [priority, setPriority] = useState('')
  const [proj, setProj] = useState('')

  //get projects
  const getProjects = async () => {
    const res = await axios.get(`${apiDomain}/projects`,{
        headers: { 'Authorization': `${user.token}` },
    })
      setProject(res.data)
  }

    //search tasks by priority
    const handlePriority = async() =>{

      try {
        const res = await axios.post(`${apiDomain}/taskPriority/${priority}`,)
        
        setPriorityTask(res.data) 
      } catch (error) {
        console.log(error);
      }

    }

    //search tasks by project name
    const handleProject = async() =>{  
      try {
        const res = await axios.post(`${apiDomain}/taskProject/${proj}`,)
        
        setProjectTask(res.data)
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() =>{
      getProjects()
      handlePriority()
      handleProject()
     
    }, [])

  return (
    <div className='filter'>

      <div className="searchTitle">Filter By Priority</div>
      <div className="byPriority">
        <select name="" id="" onChange={(e) => setPriority(e.target.value)}>
          <option value="">- select -</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button onClick={handlePriority}>Search</button>

        <div className='card-list'>
        {
          priorityTask && priorityTask.map((item, index) => (
            <div className="card" key={index}>
              <h5>Project: {item.ProjectName}</h5>
              <h5>Project Manager: {item.ProjectManager}</h5>
              <h5>Task Name: {item.TaskName}</h5>
              <h5>Start Date: {moment(item.StartDate).utc().format('DD/MM/YYYY')}</h5>
              <h5>Close Date: {moment(item.CloseDate).utc().format('DD/MM/YYYY')}</h5>
            </div>
          ))
        }
        </div>
       
      </div>

      <div className="searchTitle">Filter By project Name</div>
      <div className="byProject">
          <select name="" id="" onChange={(e) => setProj(e.target.value)}>
              <option > - select - </option>
              {
                project && project.map((item, index) => (
                    <option key={index} value={index + 1}> {item.ProjectName} </option>
                ))
              }
          </select>
          <button onClick={handleProject}>Search</button>

       <div className="card-list">
       {
          projectTask && projectTask.map((item, index) => (
               <div className="card" key={index}>
                 <h5>Project: {item.ProjectName}</h5>
                 <h5>Project Manager: {item.ProjectManager}</h5>
                 <h5>Task Name: {item.TaskName}</h5>
                 <h5>Start Date: {moment(item.StartDate).utc().format('DD/MM/YYYY')}</h5>
                 <h5>Close Date: {moment(item.CloseDate).utc().format('DD/MM/YYYY')}</h5>
               </div>
             ))
        }
       </div>
      </div> 
  
    </div>
  )
}

export default Filter