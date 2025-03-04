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
import jwt from 'jsonwebtoken';


export const signup = async (req, res, next) => {
  const { username, email, password,phone } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword,phone: phone || undefined, });

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

export const signin = async (req, res, next) => {
  const {email, password} = req.body;
  try {
    const validUser = await User.findOne({email});
    if(!validUser) return next(errorHandler(404,'user not found!'));
    const validpassword = bcryptjs.compareSync(password,validUser.password);
    if(!validpassword) return next(errorHandler(401,'Wrong credentails!'));
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
    const {password: pass, ...rest} = validUser._doc
    res
    .cookie('access_token',token ,{httpOnly:true  })
    .status(200)
    .json(rest);
   


  } catch (error) {
    next(error);
    
  }

};

export const google = async (req, res, next) => {
  try {
    console.log("Google Auth Request Body:", req.body); // Debugging log

    if (!req.body.email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      console.log("User found:", user);
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;

      return res
        .cookie('access_token', token, { httpOnly: true, sameSite: "lax" }) // Ensure cookie settings are correct
        .status(200)
        .json(rest);
    }

    console.log("User not found, creating new user...");

    const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
    const newUser = new User({
      username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
      email: req.body.email,
      password: hashedPassword,
      avatar: req.body.photo,
    });

    await newUser.save();
    console.log("New user saved:", newUser);

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = newUser._doc;

    return res
      .cookie('access_token', token, { httpOnly: true, sameSite: "lax" }) // Ensure cookie settings are correct
      .status(200)
      .json(rest);

  } catch (error) {
    console.error("Error in Google Auth:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
