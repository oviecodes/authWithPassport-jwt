

const User = require('../models/user')
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt

const opts = {}

opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'secretremainssecret'


module.exports = async(passport) => {

    passport.use(new jwtStrategy(opts, async function(jwt_payload, done) {
        try {
            const user = await User.findById( jwt_payload.id ).select('-password')
            if(user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        } catch (error) {
            return done(error, false)
        } 
    }
    ));
}
