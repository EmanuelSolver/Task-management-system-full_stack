import '../../stylingFiles/Home1.css'
import { MdOutlineVerifiedUser } from "react-icons/md"
import { AiFillDelete } from 'react-icons/ai'
import { apiDomain } from '../../utils/utils'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useContext } from 'react';
import { ContextUser } from '../../context/userContext/userContext';
import moment from 'moment';

function Home1() {
   
  const { user } = useContext(ContextUser);

  const [task, setTask] = useState([{"ProjectName": null, "Id": 0, "ProjectManager": null, "TaskName": null, "StartDate": null, "CloseDate": null}])

  const getData = async () => {
    try {
      const res = await axios.get(`${apiDomain}/tasks`, {
        headers: { 'Authorization': `${user.token}` }, 
      });
      setTask(res.data);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiDomain}/tasks/${id}`, {
        headers: { 'Authorization': `${user.token}` }, 
      });
      await getData(); // Fetch the updated data
     
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() =>{

      getData()
  }, [])



  return (
    <div className='tasks'>
      <div className="scheduled">
        <div className="title-btn">All Tasks</div>

        {
          task &&
          task.map((item, index) => (
            <div className="card" key={index}>
              <h5>Project: {item.ProjectName}</h5>
              <h5>Project Manager: {item.ProjectManager}</h5>
              <h5>Task Name: {item.TaskName}</h5>
              <h5>Start Date: {moment(item.StartDate).utc().format('DD/MM/YYYY')}</h5>
              <h5>Close Date: {moment(item.CloseDate).utc().format('DD/MM/YYYY')}</h5>
              <h4 id="delete" onClick={() => handleDelete(item.Id)}>
                <AiFillDelete /> Discard
              </h4>
            </div>
          ))
        }
      </div>


        {/* displays tasks in progress */}
      <div className="progress">
        <div className="title-btn">Tasks in Progress</div>
        {
           task && task.map((item, index) => (
              <>
              { 
                ((moment(item.CloseDate).diff(new Date().toLocaleString(),'days')) < (moment(item.CloseDate).diff(item.StartDate)))&& 
                <div className="card" key={index}>
                  <h5>Task Name: { item.TaskName}</h5>
                  <h5>Progress: </h5> 
                  <h5 id='due'>Due in: { moment(item.CloseDate).diff(new Date().toLocaleString(),'days')} Days</h5>
                </div>
                }
              
               
              </> 
          ))}
      </div>
      
      {/* displays the completed tasks */}
      <div className="completed">
       <div className="title-btn">Completed Tasks</div>
       {
           task && task.map((item, index) => (
          <>
            { 
              ((moment(item.CloseDate).diff(new Date().toLocaleString(),'days')) <= 0) &&  
              <div className="card" key={index}>
                  <h5>Task Name: { item.TaskName}</h5>
                  <h5 id='complete'>Status: Completed <MdOutlineVerifiedUser/></h5> 
              </div>
            }    
          </> 
          ))}
      </div>
    </div>
  )
}

export default Home1
