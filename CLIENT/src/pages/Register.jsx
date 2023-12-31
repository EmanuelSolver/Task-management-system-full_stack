import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import axios  from 'axios';
import { apiDomain } from '../utils/utils'
import { useForm } from "react-hook-form";
import '../stylingFiles/Login.css'

function Register() {
    const navigate = useNavigate()

        //create a schema to validate input fields before submission
        const schema = yup.object().shape({
            username: yup.string().required('Please, add your userName'),
            email: yup.string().email().required(),
            password: yup.string().matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/
                ,
                'password must contain at least 4 characters,uppercase,lowercase,number & Alphanumerics'
              ).required("Password is required"),
              confirmPassword: yup
                .string()
                .oneOf([yup.ref("password"), null], "Passwords Don't match"),
            
        });
    
        const { register, handleSubmit, formState: { errors } } = useForm({
    
            resolver: yupResolver(schema),
        });

            //send data to the database via the local API using axios
    const dataToServer = (data) => {
  
        axios.post(`${apiDomain}/signUp`, data)
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
  
            setTimeout(() => {
              navigate("/login")
          }, 5000);
            
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
    <div>
        <form className="simple-form" onSubmit={handleSubmit(dataToServer)}>
            <div>
              <h2><i>Lets Sign Up</i> </h2>
            </div>
            
            <div>
              <label htmlFor="name">User Name</label> <br />
              <input type="text" id="name" placeholder="your username" {...register("username")}/> <br />
              <span>{errors.username?.message}</span> 
            </div>

            <div>
              <label htmlFor="email">Email:</label> <br />
                <input type="email" id="email" placeholder='e.g. yourname@mail.com' {...register("email")}/> <br />
                <span>{errors.email?.message}</span>
            </div> 

            <div>
                <label htmlFor="">Set Password:</label><br />
                <input type="password"{...register("password")}/> <br />
              <span>{errors.password?.message}</span>
            </div>

            <div>
                <label htmlFor="">Confirm Password:</label><br />
                <input type="password" {...register("confirmPassword")}/> <br />
              <span>{errors.confirmPassword?.message}</span>
            </div>
     

            <button type="submit" className="btn-login">Sign up</button>
      
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
  )
}

export default Register
