const express = require('express');
const router = express.Router();
const accommodations = require('../public/assets/accomdations');
const sortAccommodations = require('../helpers/sortAccommodation');

/* GET home page. */
router.get('/', async (req, res, next) => {
  //DEFAULT DATA ON FIRST LOAD
  const checkin = new Date().toJSON().slice(0,10);
  const checkout = new Date(+new Date() + 86400000).toJSON().slice(0,10);
  const adults = 1;
  const children = 1;
  const accommodationSelection = await accommodations.filter( accommodation => { return accommodation.people <= 2});
  await sortAccommodations(accommodationSelection); 
  res.render('index', { checkin, checkout, accommodationSelection, adults, children });
});

router.get('/modify', async (req, res, next) => {
  const {checkin, checkout, adults, children } = req.query;
  const adultsNumber = parseFloat(adults);
  const childrenNumber = parseFloat(children);
  const people = adultsNumber + childrenNumber;
  const accommodationSelection = await accommodations.filter( accommodation => { return accommodation.people >= people});
  await sortAccommodations(accommodationSelection);
  res.render('index', { checkin, checkout, adults, children, accommodationSelection });
});

router.get('/reserve/:price/:title/:checkin/:checkout/:adults/:children/:promoCode', async (req, res, next) => {
  const { promoCode } = req.query;
  const {price, title, checkin, checkout, adults, children } = req.params;
  console.log(price, checkin, checkout, adults, children);
  console.log(promoCode)
  
  res.render('checkout', { price, title, checkin, checkout, adults, children });
});

module.exports = router;
