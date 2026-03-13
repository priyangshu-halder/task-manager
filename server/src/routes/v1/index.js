import express from "express"
import projectRouter from "./project.route.js"
import taskRouter from "./task.route.js"
import clientRouter from "./client.route.js"
import organizationRouter from "./organizations.route.js"
import sprintRouter from "./sprint.route.js"

const router=express.Router()
router.use(express.json())
router.use('/organizations', organizationRouter)
router.use('/organizations/:orgId/project', projectRouter)
router.use('/organizations/:orgId/project/:id/tasks', taskRouter)
router.use('/organizations/:orgId/project/:id/sprints', sprintRouter)
router.use('/organizations/:orgId/clients', clientRouter)
export default router