import '../../stylingFiles/filter.css'
import { apiDomain } from '../../utils/utils'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useContext } from 'react';
import { ContextUser } from '../../context/userContext/userContext';
import moment from 'moment';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Filter() {     
  const { user } = useContext(ContextUser);
  const [project, setProject] = useState([])
  const [priorityTask, setPriorityTask] = useState([])
  const [projectTask, setProjectTask] = useState([])
  const [priority, setPriority] = useState('')
  const [proj, setProj] = useState('')

  //get all projects
  const getProjects = async () => {
    const res = await axios.get(`${apiDomain}/projects`,{
        headers: { 'Authorization': `${user.token}` },
    })
      setProject(res.data)
  }

    //search tasks by priority
  const handlePriority = async() =>{
      
    try{
      await axios.post(`${apiDomain}/taskPriority/${priority}`, {user: user.username})
      .then((response) =>{
        response.data.message && toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });

          setPriorityTask(response.data) 
      })
      .catch(({response}) =>{

        toast.error(response.data.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      })
      } catch (error) {
        console.log(error);
      }

    }

    //search tasks by project name
    const handleProject = async() =>{  
      try {
        await axios.post(`${apiDomain}/taskProject/${proj}`, {user: user.username})
        .then((response) =>{
          response.data.message && toast.success(response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
  
            setProjectTask(response.data)
          })
        .catch(({response}) =>{
  
          toast.error(response.data.error, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        })
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
    <>
    <div className='filter'>

      <div className="byPriority">
        <div className="searchTitle">Filter By Priority</div>
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
            <div className="card1" key={index}>
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

      <div className="byProject">
          <div className="searchTitle">Filter By project Name</div>

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
               <div className="card1" key={index}>
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
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
  />
</>
  )
}

export default Filter