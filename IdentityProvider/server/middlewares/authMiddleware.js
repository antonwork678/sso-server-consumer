const CApiError = require('../classes/CApiError')
const TokenService = require('../services/TokenService')
const config = require('../config')

const userAuthMiddleware = (req, res, next) => {
    try {
        const token = TokenService.getBearerToken(req.headers)
        if (!token) {
            return next(CApiError.unauthorizedError());
        }

        const userData = TokenService.validateToken(token);
        if (!userData) {
            return next(CApiError.unauthorizedError());
        }

        req.user = userData;
        next();

    } catch (e) {
        return next(CApiError.unauthorizedError());
    }
}

const adminAuthMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(CApiError.unauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(CApiError.unauthorizedError());
        }

        const userData = TokenService.validateToken(accessToken);
        if (!userData || userData.role !== config.roleNames.admin) {
            return next(CApiError.unauthorizedError());
        }

        req.user = userData;
        next();

    } catch (e) {
        return next(CApiError.unauthorizedError());
    }
}


module.exports = {userAuthMiddleware, adminAuthMiddleware}