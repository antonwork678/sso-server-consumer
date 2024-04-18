const Session = require('../models/Session')

class SessionService
{
    async post(appId, userId, ssoToken) {
        return await Session.create({app_id: appId, user_id: userId, sso_token: ssoToken})
    }

    async deleteSession(sessionId) {
        await Session.deleteMany({_id: sessionId})
    }

    async getSessionByToken(ssoToken, appToken) {
        return Session.aggregate( [
            {
                $match: {
                    'sso_token': ssoToken
                }
            },
            {
                $lookup: {
                    from: "apps",
                    localField: "app_id",
                    foreignField: "_id",
                    as: "app"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user"
                },
            },
            {
                $project: {
                    app_id: 1,
                    'user._id': 1, 'user.email': 1, 'user.name': 1,
                    app: {
                        $filter: {
                            input: "$app",
                            as: "item",
                            cond: {
                                $eq: ["$$item.key", appToken]
                            }
                        }
                    }
                }
            }
        ] )
    }

    async getSessionByOrigin(origin) {
        return Session.aggregate( [
            {
                $lookup: {
                    from: "apps",
                    localField: "app_id",
                    foreignField: "_id",
                    as: "app"
                }
            },
            {
                $project: {
                    user_id: 1,
                    app: {
                        $filter: {
                            input: "$app",
                            as: "item",
                            cond: {
                                $eq: ["$$item.origin", origin]
                            }
                        }
                    }
                }
            }
        ] )
    }
}

module.exports = new SessionService()