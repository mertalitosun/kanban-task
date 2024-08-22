const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");


router.post("/api/register",authController.post_register)
router.post("/api/login",authController.post_login)

module.exports = router;