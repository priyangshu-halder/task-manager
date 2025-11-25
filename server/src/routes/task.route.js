import { Router } from 'express'
import {
  createTask,
  deleteTask,
  findTask,
  listTasks,
  updateTask,
} from '../controllers/task.controller.js'

const router = Router({ mergeParams: true })
router.route('/').get(listTasks)
router.route('/').post(createTask)
router.route('/:taskid').get(findTask)
router.route('/:taskid/update').post(updateTask)
router.route('/:taskid/delete').post(deleteTask)

export default router
