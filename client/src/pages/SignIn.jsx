import {Link} from 'react-router-dom';

export default function SignIn() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl test-center font-semibold my-7 mx-auto'> Signup</h1>
      <form className='flex flex-col gap-4'>
      <input type="test" placeholder='username' className='broder p-3 rounded-lg' id = 'username'/>
      <input type="email" placeholder='email' className='broder p-3 rounded-lg' id = 'email'/>
      <input type="password" placeholder='password' className='broder p-3 rounded-lg' id = 'password'/>
      <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>signup</button>
      <button className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>google</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account? </p>
        <Link to="/sign-in">
        <span className='text-blue-700'>Sign in </span>
        </Link>

      </div>
    </div>
  )
}
