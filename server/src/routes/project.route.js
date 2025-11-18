import { Router } from 'express'
import {
  findProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller.js'

const router = Router()

router.route('/findProject').get(findProject)
router.route('/createProject').post(createProject)
router.route('/updateProject').post(updateProject)
router.route('/deleteProject').post(deleteProject)

export default router
