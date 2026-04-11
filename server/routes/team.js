const express = require("express");
const router  = express.Router();
const {
  getAdminPanel,
  getEventHeads,
  getAllMembers,
} = require("../controllers/teamController");

router.get("/",        getAllMembers);
router.get("/admin",   getAdminPanel);
router.get("/events",  getEventHeads);

module.exports = router;