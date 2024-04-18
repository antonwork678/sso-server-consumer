const {roleNames} = require("../../server/config")
const {Schema, model, Types} = require('mongoose')

module.exports = model('App', new Schema({
    name: {type: String, required: true},
    origin: {type: String, required: true},
    key: {type: String, required: true}
}))