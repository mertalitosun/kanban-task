const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

const {authMiddleware} = require("../middlewares/auth");


router.post("/api/boards/:boardId/lists/:listId/cards",authMiddleware,userController.post_cards);

router.post("/api/boards/:id/lists",authMiddleware,userController.post_lists);
router.get("/api/boards/:id/lists",authMiddleware,userController.get_lists);

router.post("/api/boards/:id",authMiddleware,userController.post_add_member);//board'a kullanıcı ekleme
router.get("/api/boards/:id",authMiddleware,userController.get_boards_details);
router.post("/api/boards",authMiddleware,userController.post_boards);
router.get("/api/boards",authMiddleware,userController.get_boards);

module.exports = router;