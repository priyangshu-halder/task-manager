import { Client } from '../models/client.models'
import { Project } from '../models/projects.models'
import { asyncHandler } from '../utils/async-handler'
import { apiResponse } from '../utils/api-response'
import { apiError } from '../utils/api-error'

const createClient = asyncHandler(async (req, res) => {
  const { name, companyName, contactPerson, email, contactNumber, address, projectId } = req.body
  if (name === '' || name == undefined || !projectId)
    throw new apiError(400, 'Either client name or project is missing')
  const isProjectExists = await Project.findById(projectId)
  if (!isProjectExists) throw new apiError(404, 'The project does not exist')
  const isNameExists = await Client.findOne({
    name: name,
    company_name: companyName,
    email: email,
    project_id: projectId,
  })
  if (isNameExists) throw new apiError(400, 'This client name already exists')
  const client = await Client.create({
    name: name,
    project_id: projectId,
    company_name: companyName,
    email: email,
    contact_person: contactPerson,
    contact_number: contactNumber,
    address: address,
  })
  return res.status(200).json(new apiResponse(200, client, `Client ${name} created successfully`))
})
const updateClient = asyncHandler(async (req, res) => {
  const clientId = req.params.id
  const { name, companyName, contactPerson, email, contactNumber, address, projectId } = req.body
  const client = await Client.findById(clientId)
  if (!client) throw new apiError(404, 'Client does not exist')
  const updateFields = {}
  if (name !== undefined) updateFields.name = name
  if (companyName !== undefined) updateFields.company_name = companyName
  if (contactPerson !== undefined) updateFields.contact_person -= contactPerson
  if (email !== undefined) updateFields.email = email
  if (contactNumber !== undefined) updateFields.contact_number = contactNumber
  if (address !== undefined) updateFields.address = address
  if (projectId !== undefined) updateFields.project_id = projectId
  if (Object.keys(updateFields).length === 0) throw new apiError(400, 'No fields to update')
  const updatedClient = await Client.findByIdAndUpdate(
    clientId,
    { $set: updateFields },
    { $new: true }
  )
  return res.status(200).json(new apiResponse(200, updatedClient))
})
const deleteClient=asyncHandler(async (req, res)=>{
    const clientId=req.params.id
    const client=await Client.findById(clientId)
    if(!client) throw new apiError(404, `Client does not exist`)
    await Client.findByIdAndDelete(clientId)
    return res.status(200).json(new apiResponse(200, [], 'Deleted'))
})
export { createClient, updateClient, deleteClient }
