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
  res.render('index', { checkin, checkout, adults, children, accommodationSelection});
});

router.get('/reserve/:price/:title/:checkin/:checkout/:adults/:children/:promoCode', (req, res, next) => {
  const { promoCode } = req.query;
  const promoPreFix = promoCode.slice(0, 3);
  const promoPercentage = parseFloat(promoCode.slice(3, 5));
  const {price, title, checkin, checkout, adults, children } = req.params;
  let validPromo='';

  if (promoCode.length === 5 && promoPreFix === 'THN' && promoPercentage <= 99 && promoPercentage >= 1){
    validPromo = true
  } else {
    validPromo = false
  }

  if (validPromo === false ){
      const errorMessage = 'Your promo code is incorrect, please try again or proceed without discount';
      res.render('checkout', { price, title, checkin, checkout, adults, children, errorMessage, validPromo });
  } else if (validPromo === true ) {
    res.render('checkout', { price, title, checkin, checkout, adults, children, validPromo, promoPercentage });
  }

});

module.exports = router;
