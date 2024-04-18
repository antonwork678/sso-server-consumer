const jwt = require('jsonwebtoken')
const CApiError = require("../classes/CApiError");
const RSAService = require('../services/RSAService')

class TokenService
{
    verifyOathToken(token) {
        const publicKey = RSAService.getPublicKey()
        if (!publicKey) {
            throw CApiError.unauthorizedError('Public key error')
        }

        return jwt.verify(
            token,
            publicKey,
            {
                issuer: process.env.SSO_PUBLIC_KEY_SECRET,
                algorithms: ['RS256'],
                allowInsecureKeySizes: true
            }
        );
    }
}

module.exports = new TokenService()