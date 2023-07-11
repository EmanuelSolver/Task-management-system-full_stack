import { apiDomain }from '../utils/utils';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../context/userContext/userContext';
import '../stylingFiles/Login.css'

function Login() {
  const { dispatch } = useContext(Context);

  const navigate = useNavigate()

    const schema = yup.object().shape({
        password: yup.string().required(),
        username: yup.string().required('please enter username'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({

      resolver: yupResolver(schema),
    });

    const dataToServer = (data) => {

        axios.post(`${apiDomain}/login`, data)
            .then(({data}) =>{

              if(data.token){
                //make context aware of logged in user
                dispatch({type: "LOGIN_SUCCESS", payload: data})
                //once you successfully login, redirect to student portal
                navigate('/dashboard')
              }
           
              })
              .catch(({response}) =>{

                toast.error(response.data.error)
              })
      };


  return (
    <div>
       <form className="simple-form" onSubmit={handleSubmit(dataToServer)}>
            <div>
              <h2><i>Welcome Back</i> </h2>
            </div>
            
            <div>
              <label htmlFor="regNo">UserName</label> <br />
              <input type="text" id="regNo" {...register("username")}/>
             <br /> <span>{errors.username?.message}</span> 
            </div>

            <div>
              <label htmlFor="pass">Password</label> <br />
              <input type="password" id="pass" {...register("password")}/>
              <br /><span>{errors.password?.message}</span>
            </div>

            <div>
              <p>Forgot password? click here </p>
            </div>

            <button type="submit" className='btn-login'>Login</button>
          
            <ToastContainer
                position="top-right"
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
  )
}

export default Login
