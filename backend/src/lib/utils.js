import jwt from 'jsonwebtoken';

const expireTime = 30 // put in days

export const generateToken = (userID, res) => {
    const token = jwt.sign({userID}, process.env.JWTSECRET, {
        expiresIn:"30d"
    });

    res.cookie("jwt", token, {
        maxAge: expireTime * 24 * 3600 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    });

    return token;
}