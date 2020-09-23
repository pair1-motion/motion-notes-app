const router = require('express').Router()
const Controller = require('../controllers')

// arahkan router
router.get('/', Controller.homeC)

module.exports = router