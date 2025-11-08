import dotenv from 'dotenv'
import app from './app.js'
import connectDB from './db/dbConnection.js'

dotenv.config({
  path: './.env',
})
const port = process.env.PORT || 8001

connectDB()
  .then(
    app.listen(port, () => {
      console.log(`App is running at ${port}`)
    })
  )
  .catch(error => {
    console.error('Mongodb connection error', error)
    process.exit(1)
  })
