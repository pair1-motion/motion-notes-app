const { Board, UserBoard, User, Note} = require("../models/index")
const Helper = require("../helpers/helper")
const translate = require('translate-google')


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
            include: [User, Note]
        }
        )
        .then(data => {
            // dataBoard = data
            // res.send (data)
            let notes = data.Notes
            notes.forEach(Element => {
                Element.note = Helper.getNoteTitle(Element.note)
            })
            // res.send(notes)
            res.render('./boards/viewBoard', {board:data, users:data.Users, notes:data.Notes})
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
        console.log (req.params)
        UserBoard.create({
            UserId: req.body.UserId,
            BoardId: req.params.idBoard
        }).then((result) => {
            res.redirect (`/boards/${req.params.idBoard}`)
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
            res.redirect('/')
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
            res.redirect('/')
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
        let afterTranslate = false
        let noteId = +req.params.noteId
        Note.findOne({
            where: {
                id: noteId
            }
            })
            .then(data => {
                // res.send(data)
                let noteProperties = {
                    stat: Note.noteStats(data.note),
                    created: Note.convertDate(data.createdAt),
                    updated: Note.convertDate(data.updatedAt)
                }
                // res.send(noteProperties)
                res.render('./notes/viewNote', {afterTranslate, note: data, prop: noteProperties, date:data.getCreatedDate() })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static viewNoteInLang (req, res) {
        let dataNote
        let lang = req.query.lang
        let noteId = +req.params.noteId
        let noteProperties
        Note.findOne({
            where: {
                id: noteId
            }
            })
            .then(data => {
                dataNote = data
                // res.send(data)
                noteProperties = {
                    stat: Note.noteStats(data.note),
                    created: Note.convertDate(data.createdAt),
                    updated: Note.convertDate(data.updatedAt)
                }
                // res.send(noteProperties)
                return translate(data.note, {from: 'id', to: lang})
            }).then ((afterTranslate) => {
                console.log (afterTranslate)
                res.render('./notes/viewNote', {afterTranslate, note: dataNote, prop: noteProperties })
            })
            .catch(err => {
                res.send("err11 :" + err)
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


