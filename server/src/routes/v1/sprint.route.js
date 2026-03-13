import { Router } from 'express'
import {
  listSprint,
  getSprint,
  createSprint,
  updateSprint,
  deleteSprint,
} from '../../modules/sprints/sprint.controller.js'

const router = Router({ mergeParams: true })
router.route('/')
.get(listSprint)
.post(createSprint)
router.route('/:sprintId')
.get(getSprint)
.put(updateSprint)
.delete(deleteSprint)
// Sprint management
router.route('/:sprintId/start')
.post()
router.route('/:sprintId/complete')
.post()
router.route('/:sprintId/tasks')
.get()

// router.delete('/:sprintId/tasks/:taskId', removeTaskFromSprint)

// Sprint reports
router.get('/:sprintId/burndown')
router.get('/:sprintId/velocity')
router.get('/:sprintId/report')

export default router
