import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Signup() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', phone: ''  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to sign up. Please try again.');
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
        // Don't reset loading here, let the user try again
      } else {
        setError(null);
        navigate('/sign-in');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto justify-center h-screen'>
      <h1 className='text-3xl test-center font-semibold my-7'> SIGNUP</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="text"
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder='Phone (optional)'
          className='border p-3 rounded-lg'
          id='phone'
          onChange={handleChange}
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' disabled={loading}>
          {loading ? 'Signing up...' : 'Signup'}
        </button>
         <button className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-80' disabled={loading}>
          {loading ? 'Signing in with Google' : 'Google'}
        </button> 
      </form>
      {error && <div className="text-red-500">{error}</div>}
      <div className='flex gap-2 mt-5'>
        <p>Have an account? </p>
        <Link to="/sign-in">
          <span className='text-blue-700'>Sign in </span>
        </Link>
      </div>
    </div>
  );
}
