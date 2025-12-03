import express from 'express'
import projectRouter from './routes/project.route.js'
import taskRouter from './routes/task.route.js'
import clientRouter from './routes/client.route.js'
import sprintRouter from './routes/sprint.route.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('KHHKJ')
})

app.use('/project', projectRouter)
app.use('/project/:id/tasks', taskRouter)
app.use('/project/:id/sprints', sprintRouter)
app.use('/client', clientRouter)
export default app
