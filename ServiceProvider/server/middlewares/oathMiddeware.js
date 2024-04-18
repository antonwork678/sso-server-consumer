const checkOathAuthentication = async (req, res, next) => {
    const {ssoToken} = req.query

    if (!ssoToken && !req.session?.user) {
        const redirectURL = `${process.env.API_URL}/oath/login`
        return res.status(302).json({url: `${process.env.SSO_LOGIN_URI}?serviceURL=${redirectURL}`})
    }

    next();
}

module.exports = {checkOathAuthentication};