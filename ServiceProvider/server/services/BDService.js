const mongoose = require('mongoose')
require('dotenv').config()

class BDService {
    async Init(dbUri) {
        await mongoose.connect(dbUri, {})
    }
}

module.exports = new BDService()