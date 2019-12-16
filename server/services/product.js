const Product = require("../models/Product");
const Store = require("../models/Store");
const axios = require('axios');
const keys = require('../../config/keys');
const seeds = require('./seeds');
const { planetImg, starImg } = seeds;

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

//edit query string to fetch star data before use
const getStars = {
  method: "GET",
  url: 
    "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_name,ra,dec&order=dec&format=json"
}


async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

async function seedExoplanets(storeId) {
  let exoplanets; 
  await axios(getExoplanets).then(res => {
    exoplanets = res.data.slice(0, 10);
  })

  let store;
  await Store.findById(storeId).then(foundStore => {
    store = foundStore;
  })

  let i = 10;
  let images = planetImg;
  await asyncForEach(exoplanets, async (exo) => {
    let price;
    await axios(getPrice).then(res => {
      price = res.data.price;
    });

    let planetName;
    let climate;
    await axios({ method: "GET", url: `https://swapi.co/api/planets/${i}`})
      .then(res => {
        planetName = res.data.name;
        climate = res.data.climate;
        i++;
      })

    const productObj = {};
    // productObj.name = exo.pl_name;
    productObj.name = planetName;
    productObj.price = price;
    productObj.description = "This is a description";
    productObj.mass = 5;
    productObj.volume = 10;
    productObj.category = "exoplanet";
    productObj.store = storeId;
    productObj.image = images.pop();

    const product = await new Product(productObj).save();
    store.products.push(product);
    await store.save();
  })

  return 'Exoplanets created';
}

async function seedStars(storeId) {
  let stars;
  await axios(getStars).then(res => {
    stars = res.data.slice(0, 10);
  })

  let store;
  await Store.findById(storeId).then(foundStore => {
    store = foundStore;
  })

  let i = 10;
  let images = starImg;
  await asyncForEach(stars, async (star) => {
    let price;
    await axios(getPrice).then(res => {
      price = res.data.price;
    });

    const productObj = {};
    productObj.name = star.pl_name;
    productObj.price = price;
    productObj.description = "This is a description";
    productObj.mass = 5;
    productObj.volume = 10;
    productObj.category = "star";
    productObj.store = storeId;
    productObj.image = images.pop();

    const product = await new Product(productObj).save();
    store.products.push(product);
    await store.save();
  })

  return 'Stars created';
}



module.exports = {
  seedExoplanets,
  seedStars
}