require("express-async-errors")
const express = require ("express");
const app = express();
const cookieParser = require('cookie-parser');

require("dotenv").config();
app.use(express.json());
app.use(cookieParser());

const {errorHandlerMiddleware} = require("./src/middlewares/errorHandler")

//database
require("./src/db/dbConnection")();
const Boards = require("./src/models/boards")
const Lists = require("./src/models/lists")
const Cards = require("./src/models/cards")



const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/user");


app.use(authRoutes);
app.use(userRoutes);



//Hata yakalama
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});