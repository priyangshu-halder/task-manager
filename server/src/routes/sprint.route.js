import { Router } from 'express'
import {
  listSprint,
  getSprint,
  createSprint,
  updateSprint,
  deleteSprint,
} from '../controllers/sprint.controller.js'

const router = Router({ mergeParams: true })
router.get('/', listSprint)
router.get('/:sprintid', getSprint)
router.post('/create', createSprint)
router.post('/:sprintid/update', updateSprint)
router.post('/:sprintid/delete', deleteSprint)

export default router
