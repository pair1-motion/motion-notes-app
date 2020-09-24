const {User, Board} = require('../models')

class Controller {
    // halaman depan app
    static homeC (req, res) {
        // ganti code dibawah
        // console.log (req.session.isLoggedIn, req.session.username)
        if (req.session.isLoggedIn) {
            User.findOne ({
                where: {
                    uname: req.session.username
                },
                include: [Board]
            }).then((result) => {
                console.log ('masuk result')
                res.render ('dashboard', {
                    uname: result.uname, 
                    boards: result.Boards
                })
            }).catch((err) => {
                console.log ('masuk error')
                res.send (err)
            })
        } else {
            res.render ('index')
        }
    }

    static logOutC (req, res) {
        req.session.destroy(err => {
            if (err) res.send(err)
            res.redirect ('/')
        })
    }
}

module.exports = { 
    Controller,
    UserController: require('./user'),
    BoardController: require('./board')
}