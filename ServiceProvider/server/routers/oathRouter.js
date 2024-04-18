const Router = require('express')
const router = new Router()
const oathController = require('../controllers/oathController')
const {checkOathAuthentication} = require("../middlewares/oathMiddeware")
const {body, check} = require('express-validator')

router.get('/login', [
    checkOathAuthentication
], oathController.login)

router.post('/verify', [
    // checkOathAuthentication
], oathController.verify)

router.post('/logout', [
], oathController.logout)

module.exports = router