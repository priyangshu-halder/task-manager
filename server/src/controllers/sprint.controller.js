import { apiResponse } from '../utils/api-response.js'
import { apiError } from '../utils/api-error.js'
import { asyncHandler } from '../utils/async-handler.js'
import { Sprint } from '../models/sprint.models.js'
import { Project } from '../models/projects.models.js'

// list all sprint
const listSprint = asyncHandler(async (req, res) => {
  const projectId = req.params.id
  const getProject = await Project.findById(projectId)
  if (!getProject) throw new apiError(404, 'Project does not exist', [])
  const sprints = await Sprint.find({ project_id: projectId })
  return res.status(200).json(new apiResponse(200, sprints))
})

// get sprint
const getSprint = asyncHandler(async (req, res) => {
  const sprintId = req.params.sprintid
  const sprint = await Sprint.findById(sprintId)
  if (!sprint) throw new apiError(404, 'Something went wrong. Sprint does not exist')
  return res.status(200).json(new apiResponse(200, sprint, 'Sprint get sucessfully'))
})

// create sprint
const createSprint = asyncHandler(async (req, res) => {
  const { sprintName, status, goals, startDate, endDate, sprintNumber, assignedUsers, velocity } =
    req.body
  const projectId = req.params.id
  if (!sprintName || sprintName === '') throw new apiError(409, 'Sprint name needed')
  const projectExists = await Project.findById(projectId)
  if (!projectExists) throw new apiError(404, 'Project not found')
  const existedSprint = await Sprint.findOne({
    project_id: projectId,
    sprint_name: sprintName,
  })
  if (existedSprint) throw new apiError(409, 'This sprint already exists')
  const sprint = await Sprint.create({
    project_id: projectId,
    sprint_name: sprintName,
    status: status,
    goals: goals,
    start_date: startDate,
    end_date: endDate,
    sprint_number: sprintNumber,
    assigned_users: assignedUsers,
    velocity: velocity,
  })
  return res.status(200).json(new apiResponse(200, sprint, 'Sprint created successfully'))
})

// update sprint
const updateSprint = asyncHandler(async (req, res) => {
  const sprintId = req.params.sprintid
  const { sprintName, status, goals, startDate, endDate, sprintNumber, assignedUsers, velocity } =
    req.body
  const sprint = await Sprint.findById(sprintId)
  if (!sprint) throw new apiError(404, 'Sprint not found')
  const updateFields = {}
  if (sprintName !== undefined) updateFields.sprint_name = sprintName
  if (status !== undefined) updateFields.status = status
  if (goals !== undefined) updateFields.goals = goals
  if (startDate !== undefined) updateFields.start_date = startDate
  if (endDate !== undefined) updateFields.end_date = endDate
  if (sprintNumber !== undefined) updateFields.sprint_number = sprintNumber
  if (assignedUsers !== undefined) updateFields.assigned_users = assignedUsers
  if (velocity !== undefined) updateFields.velocity = velocity
  const updatedSprint = await Sprint.findByIdAndUpdate(
    sprintId,
    { $set: updateFields },
    { $new: true }
  )
  return res.status(200).json(new apiResponse(200, updatedSprint, 'Updated'))
})

// delete sprint
const deleteSprint = asyncHandler(async (req, res) => {
  const sprintId = req.params.sprintid
  await Sprint.findByIdAndDelete(sprintId)
  return res.status(200).json(new apiResponse(200, {}, 'Sprint deleted successfully'))
})

export { getSprint, createSprint, listSprint, updateSprint, deleteSprint }
