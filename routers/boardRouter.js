const router = require('express').Router()
const { BoardController } = require('../controllers/')


router.get('/add', BoardController.addBoardForm)

router.post('/add', BoardController.addBoard)

router.get('/:boardId', BoardController.boardViewById)

router.get('/:boardId/edit', BoardController.editBoardForm)

router.post('/:boardId/edit', BoardController.editBoard)

router.get('/:boardId/delete', BoardController.deleteBoard)

// ! Notes




module.exports = router