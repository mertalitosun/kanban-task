const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

const {authMiddleware} = require("../middlewares/auth");

router.patch("/api/v1/boards/:boardId/lists/:listId/cards/:cardId",authMiddleware,userController.update_cards);
router.delete("/api/v1/boards/:boardId/lists/:listId/cards/:cardId",authMiddleware,userController.delete_cards);
router.post("/api/v1/boards/:boardId/lists/:listId/cards",authMiddleware,userController.post_cards);

router.patch("/api/v1/boards/:boardId/lists/:listId",authMiddleware,userController.update_lists);
router.delete("/api/v1/boards/:boardId/lists/:listId",authMiddleware,userController.delete_lists);
router.post("/api/v1/boards/:boardId/lists",authMiddleware,userController.post_lists);
router.get("/api/v1/boards/:boardId/lists",authMiddleware,userController.get_lists);

router.patch("/api/v1/boards/:boardId",authMiddleware,userController.update_boards);
router.delete("/api/v1/boards/:boardId",authMiddleware,userController.delete_boards);

router.get("/api/v1/boards/:boardId/members",authMiddleware,userController.get_members);
router.delete("/api/v1/boards/:boardId/members/:memberId",authMiddleware,userController.delete_members);
router.post("/api/v1/boards/:boardId/members",authMiddleware,userController.post_add_member);//board'a kullanıcı ekleme

router.get("/api/v1/boards/:boardId",authMiddleware,userController.get_boards_details);

router.post("/api/v1/boards",authMiddleware,userController.post_boards);
router.get("/api/v1/boards",authMiddleware,userController.get_boards);

module.exports = router;