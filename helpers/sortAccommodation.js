const sortAccomodations =  (accommodations) => {
  accommodations.sort((a,b)=>{
    return a.price - b.price
  });
}

module.exports = sortAccomodations;