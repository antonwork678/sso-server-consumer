const fs = require('fs')
const config = require('../config')
const {generateKeyPairSync} = require('crypto')

class RSAService
{
    getPrivateKey(appId) {
        return fs.readFileSync(`${config.paths.privateKey}${appId}.${config.privateKeyExt}`)
    }

    generatePair(appId) {
        const {publicKey, privateKey} = generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: process.env.SSO_PRIVATE_KEY_SECRET,
            },
        })

        const privateKeyFileName = `${config.paths.privateKeys}/${appId}.${config.privateKeyExt}`
        const publicKeyFileName = `${config.paths.publicKeys}/${appId}.${config.privateKeyExt}`

        fs.writeFileSync(privateKeyFileName, privateKey)
        fs.writeFileSync(publicKeyFileName, publicKey)

        return publicKey;
    }
}

module.exports = new RSAService()