import bcrypt from 'bcryptjs';
import User from '../models/usermodel.js';
import { generateToken } from '../lib/utils.js';

// Validation helpers
const validateSignupInput = (username, email, password) => {
    if (!username || !email || !password) {
        return { isValid: false, message: "Cannot have empty fields" };
    }
    if (password.length < 8) {
        return { isValid: false, message: "Password must be at least 8 characters." };
    }
    return { isValid: true };
};

// Auth controllers
export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Cannot have empty fields" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters." });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "Email already in use." });
        }

        const salt = await bcrypt.genSalt();
        const hashedPW = await bcrypt.hash(password, salt);

        const newUser = new User({
            email: email,
            username: username,
            password: hashedPW,
        });

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                createdAt: newUser.createdAt,
                pfp: newUser.pfp || null,
            });
        } else {
            res.status(400).json({ message: "Something went wrong." });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Wrong credentials" });
        }

        const checkPW = await bcrypt.compare(password, user.password);
        if (!checkPW) {
            return res.status(400).json({ message: "Wrong credentials" });
        }

        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            pfp: user.pfp || null,  
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logout Successful" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

export const update = async (req, res) => {
    try {
        const { NewUsername } = req.body;
        const userID = req.user._id;

        const updateUser = await User.findByIdAndUpdate(userID, { username: NewUsername }, { new: true });
        res.status(200).json({ message: "Updated user" });
    } catch (e) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (e) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
