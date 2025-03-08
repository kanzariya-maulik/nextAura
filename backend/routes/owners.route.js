const express = require("express");
const router = express.Router();
const ownerController = require("../controllers/owners.controller");


router.get("/",ownerController.getAllOwners);

if(process.env.NODE_ENV === "development"){
    router.post("/create",ownerController.createOwner);
}

module.exports = router;