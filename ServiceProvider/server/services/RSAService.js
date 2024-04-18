const fs = require('fs')
const config = require('../config')

class RSAService
{
    getPublicKey() {
        return fs.readFileSync(config.paths.privateKey)
    }
}

module.exports = new RSAService()