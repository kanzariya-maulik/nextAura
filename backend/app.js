const express = require("express");
const app= express();
const dbgr = require("debug")("development:main");

const cookieParser = require("cookie-parser");
const path = require("path");
const main = require("./config/db.config");
main().then(()=>dbgr("connected to db")).catch((err)=>dbgr(err));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));

//routes
const ownersRouter = require("./routes/owners.route");
const usersRouter=require("./routes/users.route");
const productsRouter = require("./routes/products.route");
app.use("/owners",ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productsRouter);

app.listen("8080",(req,res)=>{
    dbgr("Server is running on port 8080");
});