

const User = require('../models/user')

const getSignUp = async(req, res) => {
    res.status(200).json({ msg: `welcome to the sign up route` })
}

const createUser = async(req, res) => {
    try{
        const { name, email, password } = req.body

        if(!email || !name || !password) {
            return res.status(400).json({ msg: `please fill all required fields` })
        } 

        const user = await User.findOne({ email })

        if(user) {
            return res.status(400).json({ msg: `user already exists, please enter another email` })
        } 

        const newUser = await User.create(req.body)
        return res.status(201).json({ msg: `user created`, newUser })  
    } 
    catch(error) {
        console.log(`an Error occurred`)
    }
   

}

module.exports = {
    getSignUp,
    createUser
}