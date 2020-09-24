const { User, Board } = require('../models')
const bcrypt = require('bcryptjs');

class UserController {
    // langsung menuju register juga
    static showAllUsersC (req, res) {
        User.findAll ()
            .then((data) => {
                res.render ('register', {dataMember:data})
            }).catch((err) => {
                res.send("error :" + err)
            })
    }

    static registerUserC (req, res) {
        User.create({
            uname: req.body.uname,
            email: req.body.email,
            pw: req.body.pw
        }).then((data) => {
                res.redirect ('login')
        }).catch((err) => {
            res.send ('error :' + err)
        })
    }

    static loginFormC (req, res, err) {
        User.findAll ()
            .then((data) => {
                if (err) {
                    res.render ('login', {dataMember:data, err})
                } else {
                    res.render ('login', {dataMember:data})
                }
            }).catch((err) => {
                res.send("error :" + err)
            })
    }

    static loginPostC (req, res) {
        // res.send ()
        User.findOne ({
            where: {
                uname: req.body.uname
            }
        }).then((result) => {
            if (result == null) {
                res.redirect (`login?err=true`)
            } else {
                bcrypt.compare(req.body.pw, result.pw)
                    .then((check) => {
                        if (check === true) {
                            req.session.isLoggedIn = true
                            req.session.username = result.uname
                            req.session.idUser = result.id
                            // res.redirect (`/users/${result.uname}`)
                            res.redirect (`/`)
                        } else {
                            res.redirect (`login?err=true`)
                        }
                    }).catch ((err) => {
                        res.send('error :' + err)
                    })
            }
        }).catch((err) => {
            res.send('error :' + err)
        })
    }

    // ! diganti ke router utama
    // static logoutC (req, res) {
    //     req.session.destroy(err => {
    //         if (err) res.send(err)
    //         res.redirect ('/')
    //     })
    // }

    static dashboardC (req, res) {
        User.findOne ({
            where: {
                uname: req.params.uname
            },
            include: [Board]
        }).then((result) => {
            // res.send (result)
            res.render ('dashboard', {
                uname: result.uname, 
                boards: result.Boards
            })
        }).catch((err) => {
            res.send (err)
        })
    }

    static settingC (req, res) {
        User.findOne ({
            where: {
                uname: req.params.uname
            }
        }).then((result) => {
            // res.send(result)
            res.render ('setting', { data:result })
        }).catch((err) => {
            res.send (err)
        })
    }

    static updateUserC (req, res) {
        User.update({
            uname: req.body.uname,
            email: req.body.email
        }, {
            where: {
                uname: req.params.uname
            }
        }).then((result) => {
            // res.send(result)
            res.redirect(`/users/${req.body.uname}`)
        }).catch((err) => {
            res.send("error :" + err)
        })
    }

    static deleteUserC (req, res) {
        // res.send ('msuk')
        User.destroy({
            where: {
                uname: req.params.uname
            }
        }).then((result) => {
            res.redirect ('/')
        }).catch((err) => {
            res.send ('error :' + err)
        })
    }
}

module.exports = UserController