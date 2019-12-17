const Product = require("../models/Product");
const Store = require("../models/Store");
const axios = require('axios');
const keys = require('../../config/keys');
const seeds = require('./seeds');
const { planetImg, starImg, shipImg, suitImg } = seeds;

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


const getStars = {
  method: "GET",
  url: 
    "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_hostname,pl_pnum,pl_bmassj,ra,dec&order=dec&format=json"
}

const getSpaceships = {
  method: "GET",
  url: 
    "https://swapi.co/api/starships"
}

const getSpacesuits = {
  method: "GET",
  url: 
    "https://swapi.co/api/species"
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
    productObj.name = planetName;
    productObj.price = price;
    productObj.description = "An unexplored exoplanet. Buy at your own risk!";
    productObj.mass = exo.pl_bmassj;
    productObj.volume = exo.ra;
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


  let images = starImg;
  await asyncForEach(stars, async (star) => {
    let price;
    await axios(getPrice).then(res => {
      price = res.data.price;
    });

    const productObj = {};
    productObj.name = star.pl_hostname;
    productObj.price = price;
    productObj.description = "Your very own ball of exploding gas! WARNING: Very bright - stare at your own risk!";
    productObj.mass = star.pl_bmassj * 100000;
    productObj.volume = star.ra * 100000;
    productObj.planets = star.pl_pnum;
    productObj.category = "star";
    productObj.store = storeId;
    productObj.image = images.pop();

    const product = await new Product(productObj).save();
    store.products.push(product);
    await store.save();
  })

  return 'Stars created';
}

async function seedSpaceships(storeId) {
  let spaceships;
  await axios(getSpaceships).then(res => {
    spaceships = res.data.results.slice(0, 10);
  })

  let store;
  await Store.findById(storeId).then(foundStore => {
    store = foundStore;
  })

  let images = shipImg;
  await asyncForEach(spaceships, async (ship) => {
    const productObj = {};
    productObj.name = ship.name;
    productObj.price = parseInt(ship.cost_in_credits) || 100000000;
    productObj.capacity = parseInt(ship.passengers) || 3;
    productObj.description = ship.starship_class;
    productObj.mass = Math.ceil(Math.random() * 1000);
    productObj.volume = Math.ceil(Math.random() * 1000);
    productObj.category = "spaceship";
    productObj.store = storeId;
    productObj.image = images.pop();

    const product = await new Product(productObj).save();
    store.products.push(product);
    await store.save();
  })

  return "Spaceships created";
}

async function seedSpacesuits(storeId) {
  let spacesuits;
  await axios(getSpacesuits).then(res => {
    spacesuits = res.data.results.slice(0, 10);
  })

  let store;
  await Store.findById(storeId).then(foundStore => {
    store = foundStore;
  })

  let images = suitImg;
  await asyncForEach(spacesuits, async (suit) => {
    const productObj = {};
    productObj.name = suit.name + " Suit";
    productObj.price = parseInt(suit.average_lifespan) || 100;
    productObj.description = "Protects against the dangers of space"
    productObj.mass = Math.ceil(Math.random() * 100);
    productObj.volume = Math.ceil(Math.random() * 100);
    productObj.color = suit.colors || 'black';
    productObj.category = "spacesuit";
    productObj.store = storeId;
    productObj.image = images.pop();

    const product = await new Product(productObj).save();
    store.products.push(product);
    await store.save();
  })

  return "Spacesuits created";
}

async function seedFood(storeId) {
  
}



module.exports = {
  seedExoplanets,
  seedStars,
  seedSpaceships,
  seedSpacesuits
}