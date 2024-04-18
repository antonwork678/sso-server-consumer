const axios = require('axios')
require('dotenv').config()
const CApiError = require("../classes/CApiError")
const tokenService = require('../services/TokenService')

class oathController
{
    async login (req, res, next) {
        try {
            const {ssoToken} = req.query
            if (ssoToken) {
                const response = await axios.get(`${process.env.SSO_VERIFY_URI}?ssoToken=${ssoToken}`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.SSO_APP_KEY}`
                    }
                })

                const {token} = response.data
                const tokenData = tokenService.verifyOathToken(token)
                if (!tokenData) {
                    throw CApiError.unauthorizedError()
                }

                req.session.user = tokenData.user
                req.session.globalSessionId = tokenData.globalSessionId

                return res.redirect(process.env.CLIENT_URL);
            }

        } catch (e) {
            next(CApiError.badRequest(e.message))
        }
    }

    async verify (req, res, next) {
        return res.status(200).json(req.session.user ? {user: req.session.user} : {})
    }

    async logout (req, res, next) {
        try {
            const response = await axios.post(process.env.SSO_LOGOUT_URI,
            {
                session_id: req.session.globalSessionId
            }, {
                headers: {
                    Authorization: `Bearer ${process.env.SSO_APP_KEY}`
                }
            })

            req.session.destroy()
            return res.status(200).json({})

        } catch (e) {
            next(CApiError.badRequest(e.message))
        }
    }
}

module.exports = new oathController()