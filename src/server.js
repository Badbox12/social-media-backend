const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config()
const app = express()
// auth
const authRoute = require('./routes/authRoute')
const friendRoute = require('./routes/friendRoute')
const postRoute = require('./routes/postRoute')
require('./db')
// import Middleware
const authMiddleware = require('./middleware/authMiddleware')

// middleware

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../uploads')))

app.use('/auth', authRoute)
app.use('/friend', authMiddleware, friendRoute)
app.use('/posts', authMiddleware,postRoute)

app.listen(process.env.PORT, () => {
    console.log('Server is running port = ' + process.env.PORT)
})