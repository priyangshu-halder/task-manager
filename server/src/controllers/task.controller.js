import { asyncHandler } from '../utils/async-handler.js'
import { Task } from '../models/task.models.js'
import { Project } from '../models/projects.models.js'
import { apiResponse } from '../utils/api-response.js'
import { apiError } from '../utils/api-error.js'

// list all Tasks
const listTasks = asyncHandler(async (req, res) => {
  const projectId = req.params.id
  const tasks = await Task.find({ project_id: projectId })
  return res.status(200).json(new apiResponse(200, tasks, 'All tasks fetched successfully'))
})

// find a Task
const findTask = asyncHandler(async (req, res) => {
  const taskId = req.params.taskid
  const existedTask = await Task.findById(taskId)
  if (!existedTask) {
    throw new apiError(404, 'This task does not exist')
  }
  return res.status(200).json(new apiResponse(200, existedTask, `Task found sucessfully`))
})

// Create Task
const createTask = asyncHandler(async (req, res) => {
  const { taskName, description, priority, status, assigned_to, created_by } = req.body
  if (!taskName) throw new apiError(400, 'Task name is required.')
  const projectId = req.params.id
  const project = await Project.findById(projectId)
  if (!project) throw new apiError(404, 'Project not found')
  const existedTask = await Task.findOne({
    task_name: taskName,
    project_id: projectId,
  })
  if (existedTask) {
    throw new apiError(409, 'This task already exists. Try with different name.')
  }
  const task = await Task.create({
    task_name: taskName,
    project_id: projectId,
    description,
    priority,
    status,
    assigned_to,
    created_by,
  })
  return res.status(201).json(new apiResponse(201, task, `Task ${taskName} created sucessfully`))
})

// Update Task
const updateTask = asyncHandler(async (req, res) => {
  const {
    taskName,
    changedName,
    description,
    priority,
    status,
    assigned_to,
    created_by,
    parent_task_id,
    due_date,
    estimated_time,
  } = req.body
  const taskId = req.params.taskid
  const projectId = req.params.id
  const updateFields = {}
  if (changedName !== undefined) {
    const task = await Task.findById(taskId)
    if (!task) {
      throw new apiError(404, 'This task does not exist')
    }
    if (changedName === '') {
      throw new apiError(409, 'Please provide a different task name')
    }
    const nameExists = await Task.findOne({
      task_name: changedName,
      project_id: projectId,
    })
    if (nameExists) throw new apiError(409, 'Another task in this project already has that name.')
    updateFields.task_name = changedName
  }
  if (description !== undefined) updateFields.description = description
  if (priority !== undefined) updateFields.priority = priority
  if (status !== undefined) updateFields.status = status
  if (assigned_to !== undefined) updateFields.assigned_to = assigned_to
  if (created_by !== undefined) updateFields.created_by = created_by
  if (parent_task_id !== undefined) updateFields.parent_task_id = parent_task_id
  if (due_date !== undefined) updateFields.due_date = due_date
  if (estimated_time !== undefined) updateFields.estimated_time = estimated_time
  if (Object.keys(updateFields).length === 0) {
    throw new apiError(400, 'No fields to update')
  }
  const updatedTask = await Task.findByIdAndUpdate(taskId, { $set: updateFields }, { new: true })
  if (!updatedTask) {
    throw new apiError(404, 'This task does not exist')
  }
  return res.status(200).json(new apiResponse(200, updatedTask, `Task has been updated`))
})

// Delete Task
const deleteTask = asyncHandler(async (req, res) => {
  const taskId = req.params.taskid
  const deleted = await Task.findByIdAndDelete(taskId)
  if (!deleted) throw new apiError(404, 'Task not found')
  return res.status(200).json(new apiResponse(200, {}, `Task deleted successfully`))
})

export { listTasks, findTask, createTask, updateTask, deleteTask }
