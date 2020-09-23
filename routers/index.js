const router = require('express').Router()
const {Controller} = require('../controllers')

// arahkan router
router.get('/', Controller.homeC)

router.use ('/users', require('./users'))

module.exports = router