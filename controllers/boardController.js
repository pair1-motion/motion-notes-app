const { Board, Note } = require("../models/index")

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
            ,
            include: Note            
        })
        .then(data => {
            // res.send(data)
            res.render('./boards/viewBoard', {board:data[0], notes: data[0].Notes})
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
            },
            include: Note
        })
        .then(data => {
            // res.send(data)
            res.redirect('/boards')
        })
        .catch(err => {
            res.send(err)
        })

    }

    // Notes
    static addNoteForm(req, res) {
        let idBoard = +req.params.boardId
        // res.send(req.params.boardId)
        res.render('./notes/note-form', { id: idBoard })
    }

    static addNote(req, res) {
        let idBoard = +req.params.boardId
        let newNote = {
            name: req.body.note,
            cover_img: req.body.cover_img,
            note : req.body.note,
            BoardId: idBoard
        }
        Note.create(newNote)
            .then(data => {
                res.redirect(`/boards/${idBoard}`)
            })
            .catch(err => {
                res.send(err)
            })

    }


    static viewNote(req, res) {
        let boardId = +req.params.boardId
        let noteId = +req.params.noteId
        Note.findOne({
            where: {
                id: noteId
            }
            })
            .then(data => {
                // res.send(data)
                res.render('./notes/viewNote', { note: data })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static deleteNote(req, res) {
        let boardId = +req.params.boardId
        let idTarget = +req.params.noteId
        Note.destroy({
            where: {
                id: idTarget
            },
            include: Note
        })
        .then(data => {
            // res.send(data)
            res.redirect(`/boards/${boardId}`)
        })
        .catch(err => {
            res.send(err)
        })

    }

    static editNoteForm(req, res) {
        let boardId = +req.params.boardId
        let idTarget = +req.params.noteId
        Note.findByPk(idTarget)
            .then(data => {
                // res.send(data)
                res.render('./notes/note-edit', { note:data })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editNote(req, res) {
        let boardId = +req.params.boardId
        let idTarget = +req.params.noteId
        Note.update({
            note: req.body.note,
            cover_img: req.body.cover_img,
            BoardId : boardId
        },{
            where: {
                id: idTarget
            }
        })
        .then(data => {
            res.redirect(`/boards/${boardId}`)
        })
        .catch(err => {
            res.send(err)
        })  
    }


}

module.exports = BoardController


