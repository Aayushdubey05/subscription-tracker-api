import express from "express";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subsRouter from "./routes/subscription.routes.js";
import cors from "cors";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import ajMid from "./middlewares/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.route.js";

const app = express();
// const port = 8000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
// app.use(ajMid);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subsRouter);
app.use('/api/v1/workflows', workflowRouter);
app.use(errorMiddleware);
app.use(cors());


app.get("/" , (req, res) => {
    res.send(
        {title: 'Welcome to the API',
         message: 'This is the home page of the API'}
    )
})

    
app.listen(PORT ,async ()  => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await connectToDatabase();
})

export default app;