import { asyncHandler } from '../utils/async-handler.js'
import { Project } from '../models/projects.models.js'
import { apiResponse } from '../utils/api-response.js'
import { apiError } from '../utils/api-error.js'

const findProject = asyncHandler(async (req, res) => {
  const { projectName } = req.body
  const existedProject = await Project.findOne({
    project_name: projectName,
  })
  if (!existedProject) {
    throw new apiError(409, 'This project does not exist')
  }
  return res.status(200).json(new apiResponse(200, existedProject, `Project found sucessfully`))
})

const createProject = asyncHandler(async (req, res) => {
  const { projectName, description, team_members, start_date, end_date, status, additional_info } =
    req.body
  const existedProject = await Project.findOne({
    project_name: projectName,
  })
  if (existedProject) {
    throw new apiError(409, 'This project already exists. Try with different name.')
  }
  const project = await Project.create({
    project_name: projectName,
    description,
    team_members,
    start_date,
    end_date,
    status,
    additional_info,
  })
  return res
    .status(200)
    .json(new apiResponse(200, project, `Project ${projectName} created sucessfully`))
})

const deleteProject = asyncHandler(async (req, res) => {
  const { projectName } = req.body
  const project = await Project.findOne({
    project_name: projectName,
  })
  if (!project) {
    throw new apiError(400, `Project name ${projectName} not found`)
  }
  await Project.deleteOne(project)

  return res.status(200).json(new apiResponse(200, {}, `Project has been deleted`))
})

const updateProject = asyncHandler(async (req, res) => {
  const {
    projectName,
    changedName,
    description,
    team_members,
    start_date,
    end_date,
    status,
    additional_info,
  } = req.body
  const project = await Project.findOne({
    project_name: projectName,
  })
  if (!project) {
    throw new apiError(409, 'This project does not exist')
  }
  const updateFields = {}
  if (changedName !== undefined) {
    if (changedName === '' || changedName === projectName) {
      throw new apiError(400, 'Please provide a different project name')
    }
    updateFields.project_name = changedName
  }
  if (description !== undefined) updateFields.description = description
  if (team_members !== undefined) updateFields.team_members = team_members
  if (start_date !== undefined) updateFields.start_date = start_date
  if (end_date !== undefined) updateFields.end_date = end_date
  if (status !== undefined) updateFields.status = status
  if (additional_info !== undefined) updateFields.additional_info = additional_info
  if (Object.keys(updateFields).length === 0) {
    throw new apiError(400, 'No fields to update')
  }

  await Project.findOneAndUpdate({ project_name: projectName }, { $set: updateFields })

  return res.status(200).json(new apiResponse(200, {}, `Project has been updated`))
})

export { findProject, createProject, updateProject, deleteProject }
