import { Router } from 'express'
import {
  getClient,
  createClient,
  updateClient,
  deleteClient,
} from '../../modules/clients/client.controller.js'
// import { authenticate, authorize } from '../middleware/auth.middleware.js'

const router = Router({ mergeParams: true })
// router.use(authenticate)
router.route('/')
.get()
.post(createClient)
router.route('/:clientId')
.get(getClient)
.put(updateClient)
.delete(deleteClient)
// Client projects
router.route('/:clientId/projects')
.get()
export default router
