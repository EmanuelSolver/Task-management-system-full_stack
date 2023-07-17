import axios from 'axios'
import { apiDomain } from '../utils/utils.jsx'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdatePassword() {

    const schema = yup.object().shape({
        password: yup.string().matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/
            ,
            'password must contain at least 4 characters,uppercase,lowercase,number & Alphanumerics'
          ).required("Password is required"),
          confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords Don't match"),

        username: yup.string().required(),
        email: yup.string().required(),   
    })

    const { register, handleSubmit,formState: { errors }, reset } = useForm({

    resolver: yupResolver(schema),
    });
    

    const dataToServer = (data) => {

        axios.put(`${apiDomain}/users`, data)
            .then((response) =>{
                response.data.Message && toast.success(response.data.Message, {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  })
            reset()
            })
            .catch((response) =>{
                toast.error(response.data.error,{
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });

            });
    };

  return (
    <div>
        <form className="simple-form" onSubmit={handleSubmit(dataToServer)}>
          <div>
            <h2><i>Update Password</i> </h2>
          </div>

          <label htmlFor="">Confirm Email</label>
              <input type="text" {...register("email")}/>
              <p>{errors.email?.message}</p>

          <label htmlFor="">UserName</label>
              <input type="text" {...register("username")}/>
              <p>{errors.username?.message}</p>

          <label htmlFor="">New Password:</label>
              <input type="password"{...register("password")}/>
              <p>{errors.password?.message}</p>

          <label htmlFor="">Confirm Password:</label>
              <input type="password" {...register("confirmPassword")}/>
              <p>{errors.confirmPassword?.message}</p>

          <button type='submit' className='btn-login'>Update</button>

          
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

export default UpdatePassword
