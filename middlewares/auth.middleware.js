import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

// someone is making a request get user details -> vrify token -> get user details -> pass user details to next 

const authorize = async ( req, res, next) => {
    try{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token){
            console.log("token not exists")
            return res.status(401).json({message: "Unauthorized"});
        }

        const decoded =  jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.id);

        if(!user){
            console.log("Users not exists")
            return res.status(401).json({message: "Unauthorized"});
        }

        req.user = user;

        next();
    }
    catch(error){
        res.status(401).json({
            message: "Unauthorized",
            error: error.message
        })
    }
}

export default authorize;