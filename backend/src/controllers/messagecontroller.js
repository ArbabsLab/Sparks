import User from "../models/usermodel";

export const getSidebar = async (req, res) => {
    try {
        const you = req.user._id;
        const filteredUsers = await User.find({_id: {$ne:you}}).select("-password");

        res.status(200).json(filteredUsers);
    }catch(e){
        res.status(500).json({message: e})
    }
}