// import User from '../models/user.model.js';
// import bcryptjs from 'bcryptjs';
// import { errorHandler } from '../utils/error.js';

// export const signup =async(req , res,next) =>{
//     const {username,email,password}= req.body;
//     const hashedpassword=bcryptjs.hashSync(password,10);
//     const newUser= new User({username ,email ,password:hashedpassword});
    
    
//     try {
//         await  newUser.save();
//         res.status(201).json('User createdd succesfully!');

//     } catch (error) {
//         next(error);
        
//     }

// };

import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ success: true, message: 'User created successfully!' });
  } catch (error) {
    console.error('Error during signup:', error);

    // Check if the error is a MongoDB validation error (e.g., duplicate key error)
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Duplicate email or username.' });
    }

    // For other errors, use the generic error message
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};
