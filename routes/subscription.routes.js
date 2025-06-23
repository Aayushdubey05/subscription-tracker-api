import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { subsController, getUserSubscriptions } from '../controllers/subscription.controller.js';

const subsRouter = Router();

subsRouter.get('/', (req,res) => {
    res.send({
        title: 'Subscription Plans',
        message: 'This is the subscription plans page'
    });
})

subsRouter.get('/:id', (req, res) => {
    res.send({
        title: 'Subscription Plan Details',
        message: `This is the details page for subscription plan with ID`
    });
})


subsRouter.post('/',authorize, subsController);


subsRouter.put('/:id', (req,res) => {
    res.send({
        title: "Update a subscription",
        message: "This is the update subscription plan endpoint"
    })
})

subsRouter.delete('/:id', (req,res) => {
    res.send({
        title: "To delete the subscription",
        message: "This is to delete the subscription plan"
    })
})

// passing the user id to get all the subscription of the users 
subsRouter.get('/users/:id', authorize, getUserSubscriptions);


subsRouter.put('/:id/cancel', (req, res) => {
    res.send({
        title: "To cancel the subscription of the users"
    })
})

subsRouter.get('/upcoming-renewals', (req,res) => {
    res.send({
        title: "To get the details of upcoming renewals details"
    })
})
 
export default subsRouter;
