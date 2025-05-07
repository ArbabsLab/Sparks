import jwt from 'jsonwebtoken';
import User from '../models/usermodel.js';

export const checkUser = async (req, res, next) => {
    try {
        console.log("[checkUser] Incoming request");
        const token = req.cookies.jwt;

        if (!token) {
            console.warn("[checkUser] No token found in cookies");
            return res.status(401).json({ message: "Unauthorized user: no token" });
        }

        const decoded = jwt.verify(token, process.env.JWTSECRET);
        console.log("[checkUser] Decoded token:", decoded);

        const user = await User.findById(decoded.userID).select("-password");

        if (!user) {
            console.warn("[checkUser] No user found with ID:", decoded.userID);
            return res.status(401).json({ message: "Unauthorized user: invalid ID" });
        }

        req.user = user;
        console.log("[checkUser] Authenticated user:", user.username);

        next();
    } catch (e) {
        console.error("[checkUser] Error verifying token:", e.message);
        return res.status(500).json({ message: "Could not verify user" });
    }
};
