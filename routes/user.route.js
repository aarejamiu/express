const express = require("express");
const { getDbUserPage, getDbUser, saveDbUser, deleteDbUser, updateDbUser } = require("../controllers/user.controller");
const router = express.Router();



router.get("/addDbUser", getDbUserPage)
router.post("/addDbUser", saveDbUser)
router.get("/dbUsers", getDbUser)
router.delete("/dbUser", deleteDbUser)
router.put("/dbUser", updateDbUser)

module.exports = router;