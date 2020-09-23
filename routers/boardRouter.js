const router = require('express').Router()
const BoardController = require('../controllers/boardController')
const Controller = require('../controllers/boardController')


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



module.exports = router