import User from "../models/usermodel.js";
import Message from "../models/messagemodel.js";

import { getReceiverSocketId, io } from "../lib/socket.js";

// GET /api/messages/users
export const getSidebar = async (req, res) => {
    try {
        
        const me = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: me } }).select("-password");

        

        res.status(200).json(filteredUsers);
    } catch (e) {
        console.error("[getSidebar] Error:", e.message);
        res.status(500).json({ message: e.message || "Server error" });
    }
};

// GET /api/messages/:id
export const getMessage = async (req, res) => {
    try {
   
        const me = req.user._id;
        const { id: you } = req.params;

        const messages = await Message.find({
            $or: [
                { sender: me, receiver: you },
                { sender: you, receiver: me }
            ]
        });

        
        res.status(200).json({ messages });
    } catch (e) {
        console.error("[getMessage] Error:", e.message);
        res.status(500).json({ message: e.message || "Server error" });
    }
};

// POST /api/messages/:id
export const sendMessage = async (req, res) => {
    try {
       
        const me = req.user._id;
        const { text, image } = req.body;
        const { id: you } = req.params;

        const newMessage = new Message({
            image,
            sender: me,
            receiver: you,
            text,
        });

        await newMessage.save();
        const receiverSocketId = getReceiverSocketId(you);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
        res.status(201).json(newMessage);
    } catch (e) {
        console.error("[sendMessage] Error:", e.message);
        res.status(500).json({ message: e.message || "Server error" });
    }
};
