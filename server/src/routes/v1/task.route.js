import { Router } from 'express'
import {
  createTask,
  deleteTask,
  findTask,
  listTasks,
  updateTask,
// updateTaskStatus,
//   updateTaskPriority,
//   assignTask,
//   getSubtasks,
//   createSubtask,
//   addDependency,
//   removeDependency,
//   logTimeEntry,
//   getTimeEntries,
//   updateTimeEntry,
//   deleteTimeEntry,
//   moveTask,
} from '../../modules/tasks/task.controller.js'

const router = Router({ mergeParams: true })
router.route('/')
.get(listTasks)
.post(createTask)
router.route('/:taskid')
.get(findTask)
.put(updateTask)
router.route('/:taskid/status')
.patch()
router.route('/:taskid/priority')
.patch()
router.route('/:taskid/assign')
.patch()
router.route('/:taskid')
.delete(deleteTask)
// Task relationships
router.route('/:taskid/subtasks')
.get()
.post()
router.route('/:taskid/dependencies')
.get()
.post()
router.route('/:taskId/dependencies/:dependencyTaskId')
.delete()
// Task time tracking
router.route('/:taskId/time-entries')
  .post()
  .get()
router.route('/:taskId/time-entries/:entryId')
  .put()
  .delete()
// Task across multiple projects
router.route('/:taskId/projects')
  .get()
router.route('/:taskId/projects/:projectId')
  .post()
  .delete()
// Kanban operations
router.route('/:taskId/move')
  .patch()
// Bulk operations
router.route('/bulk')
  .patch()
  .delete()
export default router
