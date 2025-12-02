import express from 'express'
import projectRouter from './routes/project.route.js'
import taskRouter from './routes/task.route.js'
import clientRouter from './routes/client.route.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('KHHKJ')
})

app.use('/project', projectRouter)
app.use('/project/:id/tasks', taskRouter)
app.use('/client', clientRouter)

export default app
