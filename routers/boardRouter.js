const router = require('express').Router()
const { BoardController } = require('../controllers/')


router.get('/add', BoardController.addBoardForm)

router.post('/add', BoardController.addBoard)

router.get('/addToRelation/:id', BoardController.addUserBoardC)

router.post('/addAuthor/:idBoard', BoardController.addAuthorC)

router.get('/:boardId', BoardController.boardViewById)

router.get('/:boardId/edit', BoardController.editBoardForm)

router.post('/:boardId/edit', BoardController.editBoard)

router.get('/:boardId/delete', BoardController.deleteBoard)

//====================== Handled by noteRouter ========================

// /boards/:boardId
router.get('/:boardId', BoardController.boardViewById)

// /boards/:boardId/add
router.get('/:boardId/notes/add', BoardController.addNoteForm)


// /boards/:boardId/add
router.get('/:boardId/notes/add', BoardController.addNoteForm)
router.post('/:boardId/notes/add', BoardController.addNote)


// /boards/1/1
router.get('/:boardId/:noteId', (req, res) => {
    if (!req.query.lang) {
        BoardController.viewNote(req, res)
    } else {
        BoardController.viewNoteInLang(req, res)
    }
})
// router.get('/:boardId/:noteId?', BoardController.viewNote)

router.get('/:boardId/:noteId/delete', BoardController.deleteNote)


// /boards/1/1
router.get('/:boardId/:noteId/edit', BoardController.editNoteForm)

router.post('/:boardId/:noteId/edit', BoardController.editNote)


module.exports = router