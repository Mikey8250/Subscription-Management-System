import { Router } from "express";
import {getUsers, getUser} from '../controller/user.controller.js'
import {authorize} from "../middlewares/authorize.middleware.js"

const userRouter = Router()

userRouter.get("/", getUsers)

userRouter.get("/:id", authorize,  getUser)

userRouter.post("/", (req, res)=> {
    res.send({title: "CREATE new users"})
})
userRouter.put("/:id", (req, res)=> {
    res.send({title: "UPDATE users"})
})
userRouter.delete("/", (req, res)=> {
    res.send({title: "DELETE users"})
})

export default userRouter;