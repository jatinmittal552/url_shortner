const express = require("express");
const { getShortId,redirect,getAnalytics } = require("../controller");

const router = express.Router();

router
.post("/",getShortId)
.get("/:shortId",redirect)
.get("/",getAnalytics)



module.exports = router;