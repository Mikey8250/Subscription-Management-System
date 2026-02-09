import { Router } from "express";
import { authorize } from "../middlewares/authorize.middleware.js";
import { createSubscription, getUserSubscription } from "../controller/subscription.controller.js";

const subscriptionRouter = Router()


// Get all subscriptions detail
subscriptionRouter.get("/", ((req, res)=> {
    res.send({title: 'GET all subscription'})
}))

// get a particular subsription detail of a customer
subscriptionRouter.get("/:id", ((req, res)=> {
    res.send({title: 'Get subscription details'})
}))

// Create a subscripiton
subscriptionRouter.post("/",authorize, createSubscription)

// Update a subscription
subscriptionRouter.put("/:id", ((req, res)=> {
    res.send({title: 'UPDATE subscription'})
}))

// delete asubscription
subscriptionRouter.delete("/:id", ((req, res)=> {
    res.send({title: 'DELETE subscription'})
}))

// get all user subscription of a particular user
subscriptionRouter.get("/users/:id", authorize, getUserSubscription)

// Cancel a subscription
subscriptionRouter.get("/:id/cancel", ((req, res)=> {
    res.send({title: 'Cancel subscription'})
}))
subscriptionRouter.get("/upcoming-renewals", ((req, res)=> {
    res.send({title: 'GET upcoming renewals'})
}))


export default subscriptionRouter