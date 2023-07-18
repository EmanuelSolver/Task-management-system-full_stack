import '../../stylingFiles/Home1.css';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { LuClipboardEdit } from 'react-icons/lu';
import { apiDomain } from '../../utils/utils';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { ContextUser } from '../../context/userContext/userContext';
import moment from 'moment';
import EditTask from '../dashboardComponents/EditTask';

function Home1() {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState([]);
  const [myTask, setMyTask] = useState({'...':'...'});

  const { user } = useContext(ContextUser);

  const getData = async () => {
    try {
      const res = await axios.get(`${apiDomain}/tasks`, {
        headers: { Authorization: `${user.token}` },
      });
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
    console.log(myTask)
  }

  useEffect(() => {
    getData();
  }, []);



  //Progress Tracker 
  let [progress, setProgress] = useState(-10);
  const [isChecked, setIsChecked] = useState(false);

  const updateProgress = () => {
    const currentDate = new Date();
    progress += 5 ;
    // You can replace the above line with your own logic to get the current day

    // Reset isChecked to false at the start of each day
    if (progress <= 100) {
      setProgress(progress);
    }
    else if(currentDate){
      setIsChecked(false);

    }
  };
  useEffect(() => {
   

    updateProgress();
  }, [isChecked]);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="tasks">
      <div className="scheduled">
        <div className="title-btn">All Tasks</div>
        {task &&
          task.map((item, index) => (
            <div className="card" key={index}>
              <h5>Project: {item.ProjectName}</h5>
              <h5>Project Manager: {item.ProjectManager}</h5>
              <h5>Task Name: {item.TaskName}</h5>
              <h5>Start Date: {moment(item.StartDate).utc().format('DD/MM/YYYY')}</h5>
              <h5>Close Date: {moment(item.CloseDate).utc().format('DD/MM/YYYY')}</h5>
              <div className="delEdit">
                <h4 id="delete" onClick={() => handleDelete(item.Id)}>
                  <AiFillDelete /> Discard
                </h4>
                <h4 id="edit" onClick={() => handleEdit(item)}>
                  <LuClipboardEdit /> Edit
                </h4>
              </div>

              {open && <EditTask setOpen={setOpen} item={myTask} />}
            </div>
          ))

          }
      </div>

      <div className="progress">
        <div className="title-btn">Tasks in Progress</div>
           
        {task &&
          task.map((item, index) => (
            <>
              {moment(item.StartDate).isSameOrBefore(moment(), 'day') &&
              moment(item.CloseDate).isAfter(moment(), 'day') ? (
                <div className="card" key={index}>
                  <h5>Task Name: {item.TaskName}</h5>
                  <h5>Progress: {progress} %</h5>
                  <h5 id="due">Due in: {moment(item.CloseDate).diff(moment(), 'days')} Days</h5>
                
                  <div className='activity'>
                  {!isChecked && (
                    <>
                      <h5>Activity_Done</h5>
                      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>

                    </>   
                  )}
                  </div>
            
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
              {moment(item.CloseDate).isBefore(moment(), 'day') && (
                <div className="card" key={index}>
                  <h5>Task Name: {item.TaskName}</h5>
                  <h5 id="complete">
                    Status: Completed <MdOutlineVerifiedUser />
                  </h5>
                </div>
              )}
            </>
          ))}
      </div>
    </div>
  );
}

export default Home1;
