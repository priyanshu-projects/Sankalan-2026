const express = require('express');
const router  = express.Router();
const { getAllSponsors } = require('../controllers/sponsorsController');

router.get('/', getAllSponsors);

module.exports = router;