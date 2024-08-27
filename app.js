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
app.set("views", path.join(__dirname, "src/views"));
app.use(express.static("node_modules"));
app.use("/static", express.static(path.join(__dirname, "src/public")));
app.use(express.urlencoded({ extended: true }));

const {errorHandlerMiddleware} = require("./src/middlewares/errorHandler");




//database
require("./src/db/dbConnection")();
const Boards = require("./src/models/boards")
const Lists = require("./src/models/lists")
const Cards = require("./src/models/cards")




const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/user");

app.use(authRoutes);
app.use(userRoutes);


app.get("/login",(req,res)=>{
  res.render("auth/login")
})

app.get("/boards",(req,res)=>{
  res.render("users/boards")
})

app.get("/boards/:id",(req,res)=>{
  res.render("users/board-details")
})



app.use(cors({origin: '*',credentials: true}));

//Hata yakalama
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});