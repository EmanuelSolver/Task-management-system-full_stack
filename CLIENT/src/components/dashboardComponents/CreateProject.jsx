import { FaTimes } from 'react-icons/fa';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from 'prop-types';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios  from 'axios';
import { apiDomain } from '../../utils/utils';
import { useForm } from "react-hook-form";
import { useContext } from 'react';
import { ContextUser } from '../../context/userContext/userContext';

function CreateProject({setOpen3}) {
    const { user } = useContext(ContextUser)

     //create a schema to validate input fields before submission
     const schema = yup.object().shape({
        project: yup.string().required('Add a project Name'),
        
    });

    const { register, handleSubmit, formState: { errors } } = useForm({

        resolver: yupResolver(schema),
    });

        //send data to the database via the local API using axios
  const dataToServer = (data) => {

        axios.post(`${apiDomain}/projects/${user.id}`, data,{
          headers: { 'Authorization': `${user.token}` },
      }).then((response) =>{
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
  return (
    <div className='add'>
        <div className="modal">
        <span className="close" onClick={() => setOpen3(false)}>
          <FaTimes />
        </span>
        <h2>Create New Project</h2>
        <form  onSubmit={handleSubmit(dataToServer)}>
                
            <div>
                <label htmlFor="project">Project Name</label>
                <input type="text" id="project" {...register("project")}/>
                <span>{errors.project?.message}</span>
            </div> 
    
            <button type="submit" className="btn-login">Save</button>
          
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
      </div>
    </div>
  )
}

CreateProject.propTypes = {
    setOpen3: PropTypes.func.isRequired,
  };
export default CreateProject
