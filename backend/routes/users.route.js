const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");

router.get("/",(req,res)=>{
    res.send("users router hits!");
});

module.exports = router;