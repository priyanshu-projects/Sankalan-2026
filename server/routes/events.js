const express        = require("express");
const router         = express.Router();
const {
  getAllEvents,
  getTechEvents,
  getNonTechEvents,
  getEventById,
} = require("../controllers/eventsController");

router.get("/",          getAllEvents);
router.get("/tech",      getTechEvents);
router.get("/nontech",   getNonTechEvents);
router.get("/:id",       getEventById);

module.exports = router;