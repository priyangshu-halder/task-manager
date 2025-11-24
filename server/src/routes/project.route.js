import { Router } from 'express'
import {
  findProject,
  createProject,
  updateProject,
  deleteProject,
  listProjects,
} from '../controllers/project.controller.js'

const router = Router()
router.route('/projects').get(listProjects)
router.route('/findProject/:id').get(findProject)
router.route('/createProject').post(createProject)
router.route('/updateProject/:id').post(updateProject)
router.route('/deleteProject/:id').post(deleteProject)

export default router
