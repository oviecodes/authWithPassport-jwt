

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const passport = require('passport')
const jwtAuth = require('./config/passportLogic')
const port = 3000

const app = express()
jwtAuth(passport)

mongoose.connect(`mongodb://localhost:27017/passport-jwt`, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.then(() => {
    console.log(`connected to mongo`)
})
.catch(e => {
    console.log(`an Error occurred`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRoutes)

app.get('/', async(req, res) => {
    res.json({ msg: 'Welcome to the homepage' })
})

app.listen(port, () => {
    console.log(`App is running on ${port}`)
})