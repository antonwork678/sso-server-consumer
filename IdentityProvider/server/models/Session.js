const {roleNames} = require("../../server/config")
const {Schema, model, Types} = require('mongoose')

module.exports = model('Session', new Schema({
    app_id: {type: Types.ObjectId, ref: 'App', required: true},
    user_id: {type: Types.ObjectId, ref: 'User', required: true},
    sso_token: {type: String, required: true}
}))