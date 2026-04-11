const express = require("express");
const router  = express.Router();
const {
  getAllResults,
  getResultsByCategory,
  getResultsByEvent,
} = require("../controllers/resultsController");

router.get("/",                    getAllResults);
router.get("/category/:category",  getResultsByCategory);
router.get("/event/:id",           getResultsByEvent);

module.exports = router;