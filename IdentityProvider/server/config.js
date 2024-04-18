const path = require('path')

module.exports = {
    roleNames: {
        user: "USER",
        admin: "ADMIN"
    },
    paths: {
        privateKeys: path.resolve(__dirname, "./keys/private/"),
        publicKeys: path.resolve(__dirname, "./keys/public/"),
    },
    privateKeyExt: 'pem'
}