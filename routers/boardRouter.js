const BoardController = require('../controllers/boardController')
const Controller = require('../controllers/boardController')
const router = require('express').Router()



// /boards
router.get('/', BoardController.boardHome)


// /boards/add
router.get('/add', BoardController.addBoardForm)

// /boards/add (post)
router.post('/add', BoardController.addBoard)

// /boards/:boardId
router.get('/:boardId', BoardController.boardViewById)

// boards/:boardId/edit
router.get('/:boardId/edit', BoardController.editBoardForm)

// boards/:boardId/edit
router.post('/:boardId/edit', BoardController.editBoard)

// /boards/:boardId/delete
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
router.get('/:boardId/:noteId', BoardController.viewNote)

router.get('/:boardId/:noteId/delete', BoardController.deleteNote)


// /boards/1/1
router.get('/:boardId/:noteId/edit', BoardController.editNoteForm)

router.post('/:boardId/:noteId/edit', BoardController.editNote)







module.exports = router