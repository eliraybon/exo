const Product = require("../models/Product");
const axios = require('axios');
const keys = require('../../config/keys');

// const seedProducts = data => {
//   switch(data.category) {
//     case "exopanet":
//       seedExoplanets();
//   }
// }

const getPrice = {
  method: "GET",
  url:
    "https://e734k0utgi.execute-api.us-east-1.amazonaws.com/default/generate-price",
  headers: {
    "x-api-key": keys.AWSKey
  }
};

const getExoplanets = {
  method: "GET",
  url:
    "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_name,ra,dec&order=dec&format=json"
};


async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

async function seedExoplanets() {
  let exoplanets; 
  await axios(getExoplanets).then(res => {
    exoplanets = res.data.slice(0, 10);
  })

  await asyncForEach(exoplanets, async (exo) => {
    let price;
    await axios(getPrice).then(res => {
      price = res.data.price;
    });

    const productObj = {};
    productObj.name = exo.pl_name;
    productObj.price = price;
    productObj.description = "This is a description";
    productObj.mass = 5;
    productObj.volume = 10;
    productObj.category = "exoplanet";
    productObj.store = "5df3d176c7623023ad48b95a"

    await new Product(productObj).save()
  })

  return 'Exoplanets created';
}

module.exports = {
  seedExoplanets
}