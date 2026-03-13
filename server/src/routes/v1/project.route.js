import { Router } from 'express'
import {
  findProject,
  createProject,
  updateProject,
  deleteProject,
  listProjects,
} from '../../modules/projects/project.controller.js'

const router = Router({ mergeParams: true })
router.route('/')
.get(listProjects)
.post(createProject)
router.route('/:projectId')
.get(findProject)
.put(updateProject)
.delete(deleteProject)
router.route('/:projectId/status')
.patch()
router.route('/:projectId/archive')
.post()
router.route('/:projectId/restore')
.post()
// Project team members
router.route('/:projectId/members')
.get()
.post()
router.route('/:projectId/members/:userId/role')
.patch()
router.route('/:projectId/members/:userId')
.delete()
// Project statistics & reports
router.route('/:projectId/stats')
.get()
router.route('/:projectId/progress')
.get()
router.route('/:projectId/timeline')
.get()
// Project settings
router.route('/:projectId/settings')
.get()
.put()
export default router
