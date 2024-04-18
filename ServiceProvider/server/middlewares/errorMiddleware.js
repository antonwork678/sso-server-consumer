const CApiError = require('../classes/CApiError')

module.exports = function(err, req, res, next) {
    if (err instanceof CApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }

    return res.status(500).json({message: 'Unknown error'})
}