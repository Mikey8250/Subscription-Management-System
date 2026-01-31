import express from 'express';
import { PORT } from './config/env.js';
import subscriptionRouter from './routes/subscription.routes.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import connectToDatabase from './database/mongoDB.js';

const app = express()

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)

app.get("/", (req, res)=> {
    res.send("Welcome to subs mangmt sys")
})

app.listen(PORT, async()=> {  
    console.log(`server is running on port ${PORT}`);

    await connectToDatabase()
    
})