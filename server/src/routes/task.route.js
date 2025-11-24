import { Router } from 'express'
import {
  createTask,
  deleteTask,
  findTask,
  listTasks,
  updateTask,
} from '../controllers/task.controller.js'

const router = Router()
router.route('/tasks').get(listTasks)
router.route('/findTask/:id').get(findTask)
router.route('/createTask').post(createTask)
router.route('/updateTask/:id').post(updateTask)
router.route('/deleteTask/:id').post(deleteTask)

export default router
