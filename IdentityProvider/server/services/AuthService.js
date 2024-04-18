const bcrypt = require('bcrypt')
const User = require("../models/User")
const App = require("../models/App")
const tokenService = require('../services/tokenService')
const RSAService = require('../services/RSAService')
const CApiError = require("../classes/CApiError")
const CUser = require("../classes/CUser")
const uuid = require('uuid')

class AuthService
{
    async registration(name, email, password, origin, app_name) {
        const userCandidate = await User.findOne({email})
        if (userCandidate) {
            throw CApiError.badRequest('User exists')
        }

        const appCandidate = await App.findOne({origin})
        if (appCandidate) {
            throw CApiError.badRequest('User exists')
        }

        const hashedPassword = await bcrypt.hash(password, 3)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const appKey = uuid.v1()

        const app = await App.create({
            name: app_name,
            origin,
            key: appKey
        })

        const publicKey = RSAService.generatePair(app._id)

        return {
            userId: user._id,
            appId: app._id,
            appKey,
            publicKey
        }
    }

    async login(email, password) {
        const user = await User.findOne({email})
        if (!user) {
            throw CApiError.badRequest('User not found')
        }

        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw CApiError.badRequest('Incorrect password')
        }

        const userObj = new CUser({...user.toObject()})

        return userObj.plain()
    }
}

module.exports = new AuthService()