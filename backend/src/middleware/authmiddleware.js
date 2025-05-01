import jwt from 'jsonwebtoken';
import User from '../models/usermodel.js';


export const checkUser = async (req, res, next) => {
    try{
        const token = req.cookies.jwt

        if (!token){
            return res.status(401).json({message: "Unauthorized user"});
        }

        const check = jwt.verify(token.process.env.JWTSECRET)

        if (!check){
            return res.status(401).json({message: "Unauthorized user"});
        }

        const user = await User.findById(check.userID).select("-password");
        req.user = user

        next()

    } catch(e){
        return res.status(500).json({message: "Could not verify user"});
    }
}