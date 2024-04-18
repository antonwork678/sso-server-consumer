require('dotenv').config()
const {validationResult} = require('express-validator')
const authService = require('../services/AuthService')
const sessionService = require('../services/SessionService')
const tokenService = require('../services/TokenService')
const User = require("../models/User")
const Session = require("../models/Session")
const App = require("../models/App")
const CApiError = require("../classes/CApiError")
const uuid = require('uuid')
const config = require('../config')
const fs = require('fs')

class authController
{
    async registration (req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(CApiError.badRequest('Registration error', errors.array()))
            }

            const { name, email, password, origin, app_name } = req.body
            const regData = await authService.registration(name, email, password, origin, app_name)

            if (!regData.publicKey) {
                return next(CApiError.badRequest('Registration error'))
            }

            return res.status(200).json({
                app_key: regData.appKey,
                public_key: regData.publicKey
            })

        } catch(e) {
            next(e)
        }
    }

    async download (req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(CApiError.badRequest('Registration error', errors.array()))
            }

            const { name, email, password, origin, app_name } = req.body
            const regData = await authService.registration(name, email, password, origin, app_name)

            if (!regData.publicKeyFileName) {
                return next(CApiError.badRequest('Registration error'))
            }

            res.download(config.paths.image + regData.publicKeyFileName)

            return res.status(200).json(regData)

        } catch(e) {
            next(e)
        }
    }

    async login (req, res, next) {
        try {
            const { email, password, serviceURL } = req.body
            const user = await authService.login(email, password)

            if (serviceURL) {
                const url = new URL(serviceURL)
                const app = await App.findOne({origin: url.origin})
                if (!app) {
                    return next(CApiError.badRequest('App error'))
                }

                const ssoToken = uuid.v4()
                const userId = user._id

                const session = await sessionService.post(app._id, userId, ssoToken)

                // req.session.globalSessionId = session.id

                return res.status(302).json({url: `${serviceURL}?ssoToken=${ssoToken}`})
            }

            return res.json(user)

        } catch(e) {
            next(e)
        }
    }

    async validate (req, res, next) {
        try {
            const {serviceURL} = req.query

            if (serviceURL) {
                const url = new URL(serviceURL)

                // const bearerToken = tokenService.getBearerToken(req.headers)
                // if (!bearerToken) {
                //     throw CApiError.unauthorizedError('App token incorrect')
                // }

                const session = await sessionService.getSessionByOrigin(url.origin)
                if (!session.length) {
                    return res.redirect(`${process.env.CLIENT_URL}/login?serviceURL=${serviceURL}`);
                }

                await sessionService.deleteSession(session[0]._id)

                const ssoToken = uuid.v4()
                const newSession = await sessionService.post(session[0].app[0]._id, session[0].user_id, ssoToken)

                return res.redirect(`${serviceURL}?ssoToken=${ssoToken}`);
            }

            return res.redirect(process.env.CLIENT_URL)

        } catch(e) {
            console.log(e)
            next(e)
        }
    }

    async verify (req, res, next) {
        try {
            const {ssoToken} = req.query
            if (!ssoToken) {
                throw CApiError.unauthorizedError('sso token error')
            }

            const bearerToken = tokenService.getBearerToken(req.headers)
            if (!bearerToken) {
                throw CApiError.unauthorizedError('bearer token error')
            }

            let session = await sessionService.getSessionByToken(ssoToken, bearerToken)
            if (!session.length || !session[0].app.length || !session[0].user.length) {
                throw CApiError.unauthorizedError('Session incorrect')
            }

            session = session[0]

            const token = tokenService.generateTokens({
                globalSessionId: session._id,
                user: session.user[0]
            }, session.app_id)

            return res.status(200).json({
                token: token,
                user: session.user[0]
            })

        } catch(e) {
            next(e)
        }
    }

    async logout (req, res, next) {
        try {
            const {session_id} = req.body
            if (!session_id) {
                return next(CApiError.badRequest('Session ID error'))
            }

            const bearerToken = tokenService.getBearerToken(req.headers)
            if (!bearerToken) {
                return next(CApiError.badRequest('Bearer token error'))
            }

            await sessionService.deleteSession(session_id)
            // req.session.destroy()

            return res.status(200).json({})

        } catch(e) {
            console.log('verify', e)
            next(e)
        }
    }
}

module.exports = new authController()