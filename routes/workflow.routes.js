import { Router } from "express";
import { sentReminders } from "../controller/workflow.controller.js";

const workflowRouter = Router()

workflowRouter.post("/subscription/reminder", sentReminders)

export default workflowRouter;