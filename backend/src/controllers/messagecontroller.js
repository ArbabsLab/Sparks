import User from "../models/usermodel.js";
import Message from "../models/messagemodel.js";

export const getSidebar = async (req, res) => {
    try {
        const me = req.user._id;
        const filteredUsers = await User.find({_id: {$ne:me}}).select("-password");

        res.status(200).json(filteredUsers);
    }catch(e){
        res.status(500).json({message: e})
    }
}

export const getMessage = async (req, res) => {
    try {
        const me = req.user._id;
        const {id:you} = req.params;

        const messages = await Message.find({
            $or:[ {sender:me, receiver:you}, {sender:you, receiver:me}]
        })

        res.status(200).json({messages});
    }catch(e){
        res.status(500).json({message:e})
    }
}

export const sendMessage = async (req, res) => {
    const me = req.user._id;
    const {text, image} = req.body;
    const { id: you} = req.params;

    const newMessage = new Message({
        image: image,
        sender: me,
        receiver: you,
        text: text,
    });

    await newMessage.save()

    res.status(201).json(newMessage)
    
}