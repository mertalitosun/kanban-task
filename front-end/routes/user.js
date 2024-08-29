const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

//delete list
router.get("/delete/boards/:boardId/lists/:listId",userController.delete_lists);
router.get("/update/boards/:boardId/lists/:listId",userController.update_lists);

//delete card
router.get("/delete/boards/:boardId/lists/:listId/cards/:cardId",userController.delete_cards);

//new card
router.get("/boards/:boardId/lists/:listId/cards",userController.post_cards);

//new list
router.get("/boards/:boardId/lists",userController.post_lists);

//delete boards
router.get("/delete/boards/:boardId",userController.delete_boards);

//members
router.get("/boards/:boardId/members/:membersId",userController.delete_boards_members);
router.get("/boards/:boardId/members",userController.get_boards_members);
router.get("/boards/:boardId/add/members",userController.post_boards_members);

//new board
router.get("/add/boards",userController.post_boards);

router.get("/boards/:id",userController.get_boards_details);

router.get("/boards",userController.get_boards);

module.exports = router;