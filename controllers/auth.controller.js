import mongoose  from "mongoose"
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";


// this is the whole function to create a new user
export const signUp = async (req, res, next) => {
    //implementing signup functionality here
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // Logic to create a new user
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            })
        }

        // check if user already exists
        const existingUser = await User.findOne({email}).session(session);
        if(existingUser){
            const error = new Error("User already exists")
            error.statusCode = 409;
            throw error;
        }
        
        // Hashing the password can be done here (not shown in this snippet)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //creating a new user
        const newUser = await User.create([{
            name,
            email,
            password: hashedPassword
        }], { session });

        const token = jwt.sign(
            { id: newUser[0]._id},
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );


        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: "User created Successfully",
            data: {
                token,
                user: newUser[0]
            }
        })
    }
    catch (error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

// this is the whole function to login the user
export const signIn = async (req, res, next) => {
    //implementing signin functionality here
    try{
        const session = await mongoose.startSession();

        session.startTransaction();
        const { email, password } = req.body;
        if(!email|| !password){
            return res.status(400).json({
                success: false,
                message: "email and password is required for the login"
            })
        }

        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password,salt);

        const existingUser = await User.findOne({email}).session(session);
        if(existingUser){

            const isItRight = await bcrypt.compare(password, existingUser.password);
            if(isItRight){
                const token = jwt.sign(
                    {id: existingUser._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN}) 
                res.status(200).json({
                    success: true,
                    message: "User is logged in",
                    data:{
                        existingUser,
                        token
                    }
                })
            }
            else{
                res.status(401).json({
                    success: false,
                    message: "Wrong password"
                })
            }
        }

        else{
            res.status(404).json({
                success: true,
                message: "User not found"
            })
        }
    }
    catch(error){
        next(error);
    }
}


// this is the function to logout the user 
export const signOut = async (req, res, next) => {
    //implementing signout functionality here
}