// const {} = require('../models')

class Controller {
    // halaman depan app
    static homeC (req, res) {
        // ganti code dibawah
        res.render ('index')
    }
}

module.exports = { 
    Controller,
    UserController: require('./user'),
    BoardController: require('./board')
}