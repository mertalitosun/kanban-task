const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

const {authMiddleware} = require("../middlewares/auth");

router.patch("/api/boards/:boardId/lists/:listId/cards/:cardId",authMiddleware,userController.update_cards);
router.delete("/api/boards/:boardId/lists/:listId/cards/:cardId",authMiddleware,userController.delete_cards);
router.post("/api/boards/:boardId/lists/:listId/cards",authMiddleware,userController.post_cards);

router.delete("/api/boards/:boardId/lists/:listId",authMiddleware,userController.delete_lists);
router.post("/api/boards/:boardId/lists",authMiddleware,userController.post_lists);
router.get("/api/boards/:boardId/lists",authMiddleware,userController.get_lists);

router.delete("/api/boards/:boardId",authMiddleware,userController.delete_boards);
router.post("/api/boards/:boardId/members",authMiddleware,userController.post_add_member);//board'a kullanıcı ekleme
router.get("/api/boards/:boardId",authMiddleware,userController.get_boards_details);

router.post("/api/boards",authMiddleware,userController.post_boards);
router.get("/api/boards",authMiddleware,userController.get_boards);

module.exports = router;