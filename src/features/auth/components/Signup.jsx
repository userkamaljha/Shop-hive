import { data } from "autoprefixer";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { createUserAsync, selectLoggedInUser } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../../assets/logo2.png"



export default function Signup() {
const dispatch = useDispatch()
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
 const user = useSelector(selectLoggedInUser)

  return (
    <>
        {user && <Navigate to='/' replace = {true}></Navigate>}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex flex-shrink-0  justify-center items-center">
                  <img
                    className="w-auto h-28"
                    src={Logo}
                    alt="Your Company"
                  />
                  {/* <p className='text-lg text-[#9CCAF2] font-sans font-medium text-white ml-1'>Shop Hive</p> */}
                </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to Create account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            noValidate
            onSubmit={handleSubmit((data) => {
              dispatch(createUserAsync({email:data.email, password:data.password, addresses:[], role: 'user' //Todo: this role can directly given on backend 
            }))
             })} >
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: 'Email is required!!',
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: 'Email not vaild!!'
                    }
                  })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link to="/forgot-password"className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>

              </div>

              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: 'Password is required!!',
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: ` at least 8 characters
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                      - Can contain special characters` }
                  })}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>


            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>

              <div className="mt-2">
                <input
                  id="confirmPassword"
                  {...register("confirmPassword",
                    {
                      required: 'Please confirm the password!',
                      validate: (value, formValues) => value === formValues.password || 'Password not matching!!'
                    })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
            </div>


            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Account
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?  {' '}
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}