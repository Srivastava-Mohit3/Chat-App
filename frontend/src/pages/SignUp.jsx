import React from 'react'
import GenderCheckBox from '../components/GenderCheckBox'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg bg-gray-200'>
        <h1 className='text-3xl font-semibold text-center text-slate-700'>Signup to 
          <span className='text-blue-700'> Chat App</span>
        </h1>

        <form>
          <div>
            <label className="label p-2">
              <span className='text-base label-text'>Username</span>
            </label>
            <input type="text" placeholder='Enter Username' className='w-full input input-bordered h-10'/>
          </div>

          <div>
            <label className="label p-2">
              <span className='text-base label-text'>Email</span>
            </label>
            <input type="email" placeholder='example@gmail.com' className='w-full input input-bordered h-10'/>
          </div>

          <div>
            <label className="label p-2">
              <span className='text-base label-text'>Password</span>
            </label>
            <input type="password" placeholder='Enter Password' className='w-full input input-bordered h-10'/>
          </div>

          <GenderCheckBox/>

          <Link to={"/login"} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'> Already an user </Link>

        </form>
      </div>
    </div>
  )
}

export default SignUp
