import express from 'express'
import projectRouter from './routes/project.route.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('KHHKJ')
})

app.use('/project', projectRouter)

export default app
