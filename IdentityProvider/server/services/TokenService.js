const fs = require('fs')

const {ObjectId} = require("bson")
const jwt = require('jsonwebtoken')
const User = require("../models/User")
const CApiError = require("../classes/CApiError")
const config = require('../config')
const RSAService = require('../services/RSAService')

class TokenService
{
    generateTokens(payload, appId) {
        return jwt.sign(
            payload,
            RSAService.getPrivateKey(appId),
            {
                expiresIn: process.env.JWT_ACCESS_EXPIRES,
                algorithm: 'RS256',
                issuer: process.env.SSO_PRIVATE_KEY_SECRET,
                allowInsecureKeySizes: true
            }
        )
    }


    getBearerToken(headers) {
        const authorizationHeader = headers.authorization;
        if (!authorizationHeader) {
            return null;
        }

        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            return null;
        }

        return token;
    }
}

module.exports = new TokenService()