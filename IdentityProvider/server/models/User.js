const {roleNames} = require("../../server/config")
const {Schema, model, Types} = require('mongoose')

module.exports = model('User', new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    is_activated: {type: Boolean, required: true, default: false},
    activation_link: {type: String, required: false},
    token: {type: String, required: false},
    role: {type: String, required: true, default: roleNames.user}
}))