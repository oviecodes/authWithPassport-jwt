

const express = require('express')
const passport = require('passport')
const router = express.Router()
const { getSignUp, createUser } = require('../controllers/signUpController')
const { getLogin, authUser } = require('../controllers/loginController')

router.route('/signup')
    .get(getSignUp)
    .post(createUser)


router.route('/login')
    .get(getLogin)
    .post(authUser)


router.route('/dashboard')
    .all(passport.authenticate('jwt', { session: false }))
    .get(async(req, res) => {
        res.status(200).json({ msg: `welcome to your dashboard` })
    })
    .post()

module.exports = router