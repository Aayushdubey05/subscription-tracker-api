import User from "../models/user.model.js";
import Subscription from "../models/subscription.model.js";


export const getUsers = async (req, res, next) => {
    try{
        const users = await User.find().select('-password');

        res.status(200).json({
            success: true,
            data: users
        })
    }
    catch(errpr){
        next(error);
    }
}

export const getSingleUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id).select('-password');

        if(!user){
            const error = new error("User not found ");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            data: user
        })
    }
    catch (error) {
        next(error)
    }
}