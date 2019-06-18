const express = require('express');
const router = express.Router();
const accommodations = require('../public/assets/accomdations');
const sortAccommodations = require('../helpers/sortAccommodation');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const today = new Date().toJSON().slice(0,10);
  const tomorrow = new Date(+new Date() + 86400000).toJSON().slice(0,10);
  const accommodationSelection = await accommodations.filter( accommodation => { return accommodation.people <= 2});
  await sortAccommodations(accommodationSelection);
  res.render('index', { today, tomorrow, accommodationSelection });
});

module.exports = router;
