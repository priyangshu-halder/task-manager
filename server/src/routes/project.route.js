import { Router } from 'express'
import {
  findProject,
  createProject,
  updateProject,
  deleteProject,
  listProjects,
} from '../controllers/project.controller.js'

const router = Router()
router.route('/').get(listProjects)
router.route('/create').post(createProject)
router.route('/:id').get(findProject)
router.route('/:id/update').post(updateProject)
router.route('/:id/delete').post(deleteProject)

export default router
