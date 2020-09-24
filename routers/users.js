const router = require('express').Router()
const { UserController, BoardController, Controller } = require('../controllers')

// ini halaman register langsung
router.get ('/', UserController.showAllUsersC)
// ini login dengan kondisi query
router.get ('/login', (req, res) => {
    // ! Penggunaan session 
    if (!req.query.err) {
        UserController.loginFormC(req, res, err=false)
    } else {
        UserController.loginFormC(req, res, err=true)
    }
})

// homenya user ini setelah login
router.get ('/:uname', UserController.dashboardC)

router.get ('/setting/:uname', UserController.settingC)
router.get ('/delete/:uname', UserController.deleteUserC)
// router.get ('/logout', UserController.logoutC) // diganti ke router utama

router.post ('/login', UserController.loginPostC)
router.post ('/register', UserController.registerUserC)
router.post ('/update/:uname', UserController.updateUserC)

// ! Board
router.use('/b', require('./boardRouter'))


module.exports = router