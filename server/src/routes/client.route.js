import { Router } from 'express'
import {
  getClient,
  createClient,
  updateClient,
  deleteClient,
} from '../controllers/client.controller.js'
const router = Router()
router.get('/client', getClient)
router.post('/create', createClient)
router.post('/update/:id', updateClient)
router.post('/delete/:id', deleteClient)
export default router
