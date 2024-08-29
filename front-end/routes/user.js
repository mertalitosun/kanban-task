const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

//delete list
router.get("/boards/:boardId/lists/:listId",userController.delete_lists)

//delete card
router.get("/delete/boards/:boardId/lists/:listId/cards/:cardId",userController.delete_cards)

//new card
router.get("/boards/:boardId/lists/:listId/cards",userController.post_cards)

//new list
router.get("/boards/:boardId/lists",userController.post_lists)

//delete boards
router.get("/delete/boards/:boardId",userController.delete_boards)

//new board
router.get("/add/boards",userController.post_boards)

router.get("/boards/:id",userController.get_boards_details)

router.get("/boards",userController.get_boards)

module.exports = router;