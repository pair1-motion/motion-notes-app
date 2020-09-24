const { Board } = require("../models/index")

class BoardController {
    // /boards
    static boardHome(req, res) {
        Board.findAll()
        .then(data => {
            res.render('./boards/boards', { boards: data})
        })
        .catch(err => {
            res.send(err)
        })        
    }

    // /boards/:boardId
    static boardViewById(req, res) {
        let idTarget = +req.params.boardId
        Board.findAll({
            where: {
                id: idTarget
            }
            // ,
            // include: Note            
        })
        .then(data => {
            res.render('./boards/viewBoard', {board:data[0]})
        })
        .catch(err=> {
            res.send(err)
        })
    }

    // /boards/add
    static addBoardForm(req, res) {
        res.render('./boards/board-form')
    }

    // /boards/add (post)
    static addBoard(req, res) {
        let newBoard = {
            name: req.body.name,
            cover_img: req.body.cover_img,
            description : req.body.description
        }
        Board.create(newBoard)
            .then(data => {
                res.redirect('/boards')
            })
            .catch(err => {
                res.send(err)
            })
    }

    // boards/:boardId/edit
    static editBoardForm(req, res) {
        let idTarget = +req.params.boardId
        Board.findByPk(idTarget)
            .then(data => {
                res.render('./boards/board-edit', { board:data })
            })
            .catch(err => {
                res.send(err)
            })
    }

    // boards/:boardId/edit (post)
    static editBoard(req, res) {
        let idTarget = +req.params.boardId
        Board.update({
            name: req.body.name,
            cover_img: req.body.cover_img,
            description : req.body.description
        },{
            where: {
                id: idTarget
            }
        })
        .then(data => {
            res.redirect('/boards')
        })
        .catch(err => {
            res.send(err)
        })  
    }

    // /boards/:boardId/delete
    static deleteBoard(req, res) {
        let idTarget = +req.params.boardId
        Board.destroy({
            where: {
                id: idTarget
            }
        })
        .then(data => {
            // res.send(data)
            res.redirect('/boards')
        })
        .catch(err => {
            res.send(err)
        })

    }

}

module.exports = BoardController


