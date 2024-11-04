require("express-async-errors")
const express = require ("express");
const app = express();
const path = require("path")
const cookieParser = require('cookie-parser');
const cors = require("cors");

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs"); //ejs template
app.set("views", path.join(__dirname, "front-end/views"));
app.use(express.static("node_modules"));
app.use("/static", express.static(path.join(__dirname, "front-end/public")));
app.use(express.urlencoded({ extended: true }));

const {errorHandlerMiddleware,notFoundMiddleware} = require("./src/middlewares/errorHandler");




//database
require("./src/db/dbConnection")();
const Boards = require("./src/models/boards")
const Lists = require("./src/models/lists")
const Cards = require("./src/models/cards")

//frontend
const userRoutes = require("./front-end/routes/user");
const authRoutes = require("./front-end/routes/auth");

//backend
const apiAuthRoutes = require("./src/routes/auth");
const apiUserRoutes = require("./src/routes/user");

app.use(cors({origin: '*',credentials: true}));

//backend
app.use(apiAuthRoutes);
app.use(apiUserRoutes);

//frontend
app.use(userRoutes);
app.use(authRoutes);

app.use(notFoundMiddleware);



//Hata yakalama
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
