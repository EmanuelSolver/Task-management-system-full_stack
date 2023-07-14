import '../../stylingFiles/Login.css'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {toast, ToastContainer} from 'react-toastify';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import axios  from 'axios';
import { apiDomain } from '../../utils/utils';
import { useForm } from "react-hook-form";
import { useContext } from 'react';
import { ContextUser } from '../../context/userContext/userContext';
import moment from 'moment';

function Projects() {
    const { user } = useContext(ContextUser)
     //get projects and users from the database
     const [members, setMembers] = useState([])
     const [project, setProject] = useState([])
     const [start, setStart] = useState([])

     const getMembers = async () => {
         const response = await axios.get(`${apiDomain}/users`,{
          headers: { 'Authorization': `${user.token}` },
      })
         setMembers(response.data)
     }

     //get projects
     const getProjects = async () => {
       const res = await axios.get(`${apiDomain}/projects`,{
        headers: { 'Authorization': `${user.token}` },
    })
       setProject(res.data)
   }

   useEffect(() =>{
     
       getMembers()
       getProjects()
   }, [])


    //create a schema to validate input fields before submission
    const schema = yup.object().shape({
        project: yup.string().required('select a project'),
        taskName: yup.string().required('Type task Name'),
        end: yup.string().required(),
        start: yup.string().required(),
        member: yup.string().required(),
        
    });

    const { register, handleSubmit, formState: { errors } } = useForm({

        resolver: yupResolver(schema),
    });

        //send data to the database via the local API using axios
const dataToServer = (data) => {

    axios.post(`${apiDomain}/tasks`, data,{
      headers: { 'Authorization': `${user.token}` },
  })
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
  }; 

  const checkDate = (e) => {
     //calculation of days
     let end = e.target.value
     let result = moment(end).diff(start,'days')

     result < 0 && toast.error('Closing Date must be ahead of Start Date', {
       position: "top-center",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "colored",
       })
   }
     
  
  return (
    <form className="simple-form" onSubmit={handleSubmit(dataToServer)}>
                
            <div>
                <label htmlFor="name">Project</label> <br />
                <select name="" id="" {...register("project")}>
                    <option > - select - </option>
                    {
                    project && project.map((item, index) => (
                        <option key={index} value={index + 1}> {item.ProjectName} </option>
                    ))}
                </select>              
                <span>{errors.project?.message}</span> 
            </div>

            <div>
              <label htmlFor="task">Task Name</label>
                <input type="text" id="task" {...register("taskName")}/>
                <span>{errors.taskName?.message}</span>
            </div> 
            <div>
              <label htmlFor="task">Priority</label> 
                <select name="" id="" {...register("priority")}>
                  <option value="">-select-</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <span>{errors.priority?.message}</span>
            </div> 

            <div>
                <label htmlFor="start">Start Date</label>
                <input id='start' type="date"{...register("start")} onChange={e =>setStart(e.target.value)}/>              
                <span>{errors.start?.message}</span>
            </div>

            <div>
                <label htmlFor="">Close Date</label><br />
                <input type="date" {...register("end")} onChange={checkDate}/>
              <span>{errors.end?.message}</span>
            </div>

            <div>
                <label htmlFor="">Assign Member</label>
                <select name="" id="" {...register("member")}>
                <option > - select - </option>
                    {
                    members && members.map((item, index) => (
                        <option key={index} value={index + 1}> {item.UserName} </option>
                    ))}
                </select>
              <span>{errors.member?.message}</span>
            </div>

            <button type="submit" className="btn-login">Add</button>
      
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

          </form>  
  )
}

export default Projects
