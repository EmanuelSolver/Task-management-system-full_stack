import '../../stylingFiles/Home1.css';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { LuClipboardEdit } from 'react-icons/lu';
import { LuBookmarkPlus } from 'react-icons/lu'
import { apiDomain } from '../../utils/utils';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { ContextUser } from '../../context/userContext/userContext';
import moment from 'moment';
import EditTask from '../dashboardComponents/EditTask';
import TrackProgress from '../dashboardComponents/TrackProgress'

function Home1() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [task, setTask] = useState([]);
  const [myTask, setMyTask] = useState({});
  const [myTask2, setMyTask2] = useState({});
  const { user } = useContext(ContextUser);

  const getData = async () => {
    try {
      const res = await axios.get(`${apiDomain}/tasks/${user.username}`, {
        headers: { Authorization: `${user.token}` },
      })
      setTask(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiDomain}/tasks/${id}`, {
        headers: { Authorization: `${user.token}` },
      });
      await getData(); // Fetch the updated data
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async(item) =>{
    const pop = item
    setMyTask(pop)
    setOpen(true)
  }

  useEffect(() => {

    getData();
  }, []);


  const handleProgress = (item) => {
    setOpen2(true)
    const tempItem = item
    setMyTask2(tempItem)
  }

  return (
    <div className="tasks">
      <div className="scheduled">
        <div className="title-btn">All Tasks</div>
        {
          task &&
          task.map((item, index) => {
   
          return(
          <div className="card" key={index}>
        
            <h5>Project: {item.ProjectName}</h5>
            <h5>Project Manager: {item.ProjectManager}</h5>
            <h5>Task Name: {item.TaskName}</h5>
            <h5>Assigned To: {item.UserName}</h5>
            <h5>Start Date: {moment(item.StartDate).utc().format('DD/MM/YYYY')}</h5>
            <h5>Close Date: {moment(item.CloseDate).utc().format('DD/MM/YYYY')}</h5>
            
           { //it is only a project manager who  can edit or delete a task
           item.ProjectManager == user.username &&
             <div className="delEdit">
             <h4 id="delete" onClick={() => handleDelete(item.Id)}>
               <AiFillDelete /> Discard
             </h4>
             <h4 id="edit" onClick={() => handleEdit(item)}>
               <LuClipboardEdit /> Edit
             </h4>
           </div>
           }

            {open && <EditTask setOpen={setOpen} item={myTask} />}
            </div>)
            })
        }

      </div>

      <div className="progress">
        <div className="title-btn">Tasks in Progress</div>
           
        {task &&
          task.map((item, index) => (
            <>
              {moment(item.StartDate).isSameOrBefore(moment(), 'day') &&
              item.Progress < 100 &&
              moment(item.CloseDate).isAfter(moment(), 'day') ? (
                <div className="card" key={index}>
                  <h5>Task Name: {item.TaskName}</h5>
                  <h5>Progress: {item.Progress} %</h5>
                  <h5 id="due">Due in: {moment(item.CloseDate).diff(moment(), 'days')} Days</h5>
                
                  <h4 id="done" onClick={() => handleProgress(item)}>
                  <LuBookmarkPlus /> Check Activity
                  </h4>
                  {open2 && <TrackProgress setOpen2={setOpen2} item={myTask2} />}
                </div>
                
              ) : null}

            </>
          ))}
      </div>

      <div className="completed">
        <div className="title-btn">Completed Tasks</div>
        {task &&
          task.map((item, index) => (
            <>
              {moment(item.CloseDate).isSameOrAfter(moment(), 'day') && 
              item.Progress >= 100 ?
              (
                <div className="card" key={index}>
                  <h5>Task Name: {item.TaskName}</h5>
                  <h5 id="complete">
                    Status: Completed <MdOutlineVerifiedUser />
                  </h5>
                </div>
              ): null
            }
            </>
          ))}
      </div>
    </div>
  );
}

export default Home1;
