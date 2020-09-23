const router = require('express').Router()
const { UserController } = require('../controllers')


router.get ('/', UserController.showAllUsersC)
router.get ('/login', UserController.loginFormC)


router.get ('/dashboard/:uname', UserController.dashboardC)

router.get ('/setting/:uname', UserController.settingC)
router.get ('/delete/:uname', UserController.deleteUserC)

router.post ('/login', UserController.loginPostC)
router.post ('/register', UserController.registerUserC)
router.post ('/update/:uname', UserController.updateUserC)

module.exports = router