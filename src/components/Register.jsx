
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, registerUser } from './Auth/service';
import { authLogin } from '../features/tasks/authSlice';
import { toast } from 'react-toastify';
import task_logo from "../images/task_logo.png";

function Register() {

  const { register, handleSubmit, watch, formState: { errors },reset, } = useForm();
    const navigate = useNavigate();
    const dispatch=useDispatch()

    async function onSubmit(data) {
        const loading = toast.loading("Loading");

      try {
         
          const responseRegister= await registerUser(data) ;
          const responseLogin=await login(data) ;
          dispatch(authLogin(true))
          const from = location.state?.from?.pathname || "/";
          toast.dismiss(loading);
            toast.success("user logged successfully");
          navigate(from, { replace: true });
          
        } catch (error) {
            toast.dismiss(loading);
            toast.error(error.message);
        }
  }


  return ( <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src={task_logo} alt="logo"/>
          TaskList App  
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Register your account
              </h1>
              <form className="space-y-4 md:space-y-6"  onSubmit={handleSubmit(onSubmit)}>
                  <div>
                      <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                      <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username"  {...register("username",{required:true})} />
                      {errors.username && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oh, snapp!</span> This field is required </p>}
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("password",{required:true})} />
                      {errors.password && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oh, snapp!</span>This field is required</p>}
                  </div>
                  <div>
                      <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="password" name="confirm_password" id="confirm_password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("confirm_password",{required:true,
                        validate: (val) => {
                            if (watch('password') != val) {
                              return "Your passwords do no match";
                            }
                          }
                    })} />
                      {errors.confirm_password && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oh, snapp!</span> {errors.confirm_password.message || "This fiels is required"} </p>}
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          
                         
                      </div>
                      
                  </div>
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Register</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500"><Link to={"/login"}>Login here</Link></a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  )
}

export default Register