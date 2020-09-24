const router = require('express').Router()
const { Controller } = require('../controllers')
const boardRouter = require('./boardRouter')


// arahkan router
router.get('/', Controller.homeC)
router.get('/logout', Controller.logOutC)

// user router
router.use ('/users', require('./users'))

// boardRouter
router.use('/boards', boardRouter)

module.exports = router