import express from 'express'
import { dbConnection } from './dbConnection.js'
import { userModel } from './Models/user.model.js'
import userRouter from './modules/user/user.routes.js'
import companyRouter from './modules/company/company.routes.js'
import jobRouter from './modules/job/job.routes.js'
import 'dotenv/config'

const app = express()
const port = process.env.port || 3000


app.use(express.json())
app.use(userRouter)
app.use(companyRouter)
app.use(jobRouter)
app.use((err, req, res, next) => {
  res.json({ error: err })
})
dbConnection()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))