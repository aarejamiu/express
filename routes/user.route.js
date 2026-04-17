const express = require("express");
const { getDbUserPage, getLoginPage, getDbUser, saveDbUser, deleteDbUser, updateDbUser, loginDbUser } = require("../controllers/user.controller");
const router = express.Router();



router.get("/addDbUser", getDbUserPage)
router.post("/addDbUser", saveDbUser)
router.get("/dbUsers", getDbUser)
router.delete("/dbUser/:id", deleteDbUser)
router.put("/dbUser/:id", updateDbUser)
router.get("/login", getLoginPage)
router.post("/login", loginDbUser)

module.exports = router;