import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Corrected line

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
        setError(data.message);
        // Don't reset loading here, let the user try again
      } else {
        setError(null);
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto justify-center h-screen'>
      <h1 className='text-3xl test-center font-semibold my-7'> SIGNIN</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        
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
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' disabled={loading}>
          {loading ? 'Signing up...' : 'Signin'}
        </button>
        {/* <button className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-80' disabled={loading}>
          {loading ? 'Signing up...' : 'Google'}
        </button> */}
      </form>
      {error && <div className="text-red-500">{error}</div>}
      <div className='flex gap-2 mt-5'>
        <p>Dont Have an account? </p>
        <Link to="/sign-up">
          <span className='text-blue-700'>Sign up </span>
        </Link>
      </div>
    </div>
  );
}
