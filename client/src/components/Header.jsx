import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import{useSelector} from 'react-redux'

export default function Header() {
  const {currentUser}=useSelector(state => state.user)
  console.log("Current User:", currentUser);
  
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>     
         <Link to='/'>
         <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
          <span className='text-slate-500'>CELEBRATE</span>
          <span className='text-slate-700'>HYDERABAD</span>
        </h1>
        </Link >
      <form className='bg-slate-100  p-3 rounded-lg flex items-center w-24 sm:w-64'><input type="text" placeholder="search..." className='bg-transparent' />
      <FaSearch className='text-slate-600'/> 
      
      </form>
      <ul className='flex gap-4'>
      <Link to='/'>
        <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
        </Link >
        <Link to='/about'>
        <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
        </Link >
        <Link to='/sign-in'>
  {currentUser?.avatar ? (
    <img 
      src={currentUser.avatar} 
      alt="Profile"
      className="w-10 h-10 rounded-full border border-gray-300 object-cover"
      onError={(e) => e.target.src = "https://via.placeholder.com/40"} // Fallback image
    />
  ) : (
    <li className='text-slate-700 hover:underline'>Sign In</li>
  )}
</Link>



        
        
        {/* <li className='hidden sm:inline text-slate-700 hover:underline'>SignUp</li> */}
       
      </ul>
      </div>
      
    </header>
     
  )
}

// import React from "react";
// import {
//   Navbar,
//   Typography,
//   IconButton,
//   Button,
//   Input,
// } from "@material-tailwind/react";


// function Header() {
//   return (
//     <Navbar
//       variant="gradient"
//       className="mx-auto max-w-screen-xxl bg-blue-500 px-4 py-3 flex justify-center "
//     >
//       <Typography
//       variant="h6"
//       className="mr-4 ml-2 cursor-pointer py-1.5 text-2xl text-white"
//       onClick={() => window.location.reload()}
//     >
//       DNS DASHBOARD
//     </Typography>
//     </Navbar>
//   );
// }

// export default Header;

