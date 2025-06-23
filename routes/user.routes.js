import { Router } from "express";
import { getUsers, getSingleUser } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
const userRouter = Router();

// get all users over here
userRouter.get('/', getUsers);

//get single user over here 
userRouter.get('/:id', authorize, getSingleUser);

userRouter.post('/', (req, res) => {
    res.send({
        title: 'Create New User',
        message: 'This is the create user page'
    })
})

userRouter.put('/:id', (req, res) => {
    res.send({
        title: 'Update User',
        message: `This is the update page for user with ID: ${req.params.id}`
    })
}) 

userRouter.delete('/:id', (req, res) => {
    res.send({
        title: 'Delete User',
        message: `This is the delete page for user with ID: ${req.params.id}`
    })
})

export default userRouter;
