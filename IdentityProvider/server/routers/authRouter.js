const Router = require('express')
const router = new Router()
const authController = require('../controllers/authController')
const {body, check} = require('express-validator')

router.post('/registration', [
    body('email', 'Email error').notEmpty().isEmail(),
    body('password', 'Password error').notEmpty().isLength({min: 5}),
    body('name', 'Name error').notEmpty(),
    body('app_name', 'App name error').notEmpty(),
    body('origin', 'Origin error').notEmpty()
], authController.registration)

router.post('/login', [
    body('email', 'Email error').notEmpty(),
    body('password', 'Password error').notEmpty().isLength({min: 5}),
], authController.login)

router.get('/validate', [], authController.validate)

router.get('/verify', [], authController.verify)

router.post('/logout', [], authController.logout)

module.exports = router