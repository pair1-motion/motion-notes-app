const { Board, UserBoard, User} = require("../models/index")

class BoardController {
    // /boards
    // static boardHome(req, res) {
    //     Board.findAll()
    //     .then(data => {
    //         res.render('./boards/boards', { boards: data})
    //     })
    //     .catch(err => {
    //         res.send(err)
    //     })
    // }

    // /boards/:boardId
    static boardViewById(req, res) {
        // let dataBoard
        Board.findByPk(req.params.boardId, {
            include: User
        }
        )
        .then(data => {
            // dataBoard = data
            // res.send (data)
            res.render('./boards/viewBoard', {board:data, users:data.Users})
        })
        .catch(err=> {
            res.send("error :" + err)
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
                // res.send(id)
                res.redirect(`/boards/addToRelation/${data.id}`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addUserBoardC (req, res) {
        UserBoard.create ({
            UserId: req.session.idUser,
            BoardId: req.params.id
        }).then((result) => {
            res.redirect ('/')
        }).catch((err) => {
            res.send (err)
        })
    }

    static addAuthorC (req, res) {
        // console.log (req.params)
        UserBoard.create({
            UserId: req.body.UserId,
            BoardId: req.params.idBoard
        }).then((result) => {
            res.redirect (`/boards/viewBoard/${req.params.id}`)
        }).catch((err) => {
            res.send("err" + err)
        });
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


