
import bcrypt from 'bcryptjs';
import User from '../models/usermodel.js';
import { generateToken } from '../lib/utils.js';

export const signup = async (req, res) => {
    const {username, email, password} = req.body
    try{
        if (password.length < 8){
            return res.status(400).json({message: "Password must be at least 8 characters."});
        }

        const user = await User.findOne({email})

        if (user){
            return res.status(400).json({message: "Email already in use."});
        }

        const salt = await bcrypt.genSalt();
        const hashedPW = await bcrypt.hash(password, salt);

        const newUser = new User({
            email: email,
            username: username,
            password: hashedPW,

        });

        if (newUser){
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({message: "New User Created"})
        }else{
            res.status(400).json({message: "Something went wrong."});
        }

    }catch(error){
        res.status(500).json({message: "Something went wrong."});
        
    }
};


export const login = (req, res) => {

};


export const logout = (req, res) => {

};