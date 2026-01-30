import express from 'express';
import { PORT } from './config/env.js';

const app = express()


app.get("/", (req, res)=> {
    res.send("Welcome to subs mangmt sys")
})

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`);
    
})