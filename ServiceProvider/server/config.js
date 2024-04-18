const path = require('path')

module.exports = {
    roleNames: {
        user: "USER",
        admin: "ADMIN"
    },
    paths: {
        privateKey: path.resolve(__dirname, "./keys/publicSSO.pem")
    }
}