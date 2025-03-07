import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import {signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const{loading,error} = useSelector((state)=>state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
    
      navigate('/');

      
    } catch (error) {
      dispatch(signInFailure(error.message));
     
    } 
  };

  // The return statement should be here, directly inside the component function but outside of any other function definition.
  return (
    <div className='p-3 max-w-lg mx-auto justify-center h-screen'>
      <h1 className='text-3xl text-center font-semibold my-7'>SIGN IN</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        
        <input
          type="email"
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder='Password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
        <OAuth/>
      </form>
      {error && <div className="text-red-500">{error}</div>}
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to="/sign-up">
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
    </div>
  );
}




                //  doubt code
// export default function SignIn() {
//   const [formData, setFormData] = useState({});
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(signInStart());
//       const res = await fetch('/api/auth/signin', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       console.log(data);
//       if (data.success === false) {
//         setLoading(false);
//         setError(data.message);
//         return;
//       }
//       setLoading(false);
//       setError(null);
//       navigate('/');

      
//     } catch (error) {
//       setLoading(false);
//       setError(error.message);
//     } 
//   };

//   // The return statement should be here, directly inside the component function but outside of any other function definition.
//   return (
//     <div className='p-3 max-w-lg mx-auto justify-center h-screen'>
//       <h1 className='text-3xl text-center font-semibold my-7'>SIGN IN</h1>
//       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        
//         <input
//           type="email"
//           placeholder='Email'
//           className='border p-3 rounded-lg'
//           id='email'
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           placeholder='Password'
//           className='border p-3 rounded-lg'
//           id='password'
//           onChange={handleChange}
//         />
//         <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' disabled={loading}>
//           {loading ? 'Signing in...' : 'Sign in'}
//         </button>
//       </form>
//       {error && <div className="text-red-500">{error}</div>}
//       <div className='flex gap-2 mt-5'>
//         <p>Don't have an account?</p>
//         <Link to="/sign-up">
//           <span className='text-blue-700'>Sign up</span>
//         </Link>
//       </div>
//     </div>
//   );
// }

