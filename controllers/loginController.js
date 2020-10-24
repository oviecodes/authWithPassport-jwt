
require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const getLogin = async(req, res) => {
    return res.status(200).json({ msg: `welcome to the login page` })
}

const authUser = async(req, res) => {
    const { email, password } = req.body

    if(!email || !password){
        return res.status(400).json({ msg: `please fill all required fields` }) 
    }

    const user = await User.findOne({ email })
    if(!user){
        return res.status(400).json({ msg: `${email} is not a valid user` })
    } else {
        const valid = await user.validPassword(password)
        if(valid) {
            jwt.sign({ id: user.id }, process.env.JWTSECRET, { expiresIn: Number(process.env.EXPIRESIN) }, function(err, token) {
                if(err){
                    return res.status(400).json({ msg: `an error occurred here` })
                }
                return res.status(200).json({ token })
            });

        } else {
            return res.status(400).json({ msg: `incorrect password` })
        }
    }

}

module.exports = {
    getLogin,
    authUser
}