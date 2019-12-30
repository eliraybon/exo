const Product = require("../models/Product");
const Store = require("../models/Store");
const axios = require('axios');
const keys = require('../../config/keys');
const seeds = require('./seeds');
const { planetImg, starImg, shipImg, suitImg, foodImg } = seeds;

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
    "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_name,ra,st_dist,st_elon,st_elat,pl_hostname,pl_rade,pl_dens,pl_masse,pl_rade,dec&order=dec&format=json"
};


const getStars = {
  method: "GET",
  url: 
    "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=missionstars&select=st_mass,star_name,st_rad,st_ppnum,st_glon,st_glat,st_spttag,st_age,st_lbol,st_rad,st_metratio,st_dist&order=dec&format=json"
}




const getFood = {
  method: "GET",
  url: 
    "https://recipe-puppy.p.rapidapi.com/",
  headers: {
    "X-RapidAPI-Key": keys.foodKey
  }
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
    productObj.mass = exo.fpl_masse || 10 ;
    productObj.volume = exo.ra;
    productObj.category = "exoplanet";
    productObj.store = storeId;
    productObj.image = images.pop();

    productObj.exoDistance = exo.st_dist;
    productObj.elipticLongitude = exo.st_elon;
    productObj.elipticLatitude = exo.st_elat;
    productObj.starSystem = exo.fpl_hostname;
    productObj.planetRad = exo.fpl_rade || 2.19 ;
    productObj.planetDensity = exo.fpl_dens || 1.72 ;

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
    productObj.name = star.star_name;
    productObj.price = price;
    productObj.description = "Your very own ball of exploding gas! WARNING: Very bright - stare at your own risk!";
    productObj.mass = star.st_mass || 2.09 ;
    productObj.volume = star.st_rad * 6.28;
    productObj.planets = star.st_ppnum;
    productObj.category = "star";
    productObj.store = storeId;
    productObj.image = images.pop();
    productObj.galacticLongitude = star.st_glon;
    productObj.galacticLatitude = star.st_glat;
    productObj.spectralType = star.st_spttag;
    productObj.stellarAge = star.st_age;
    productObj.luminosity = star.st_lbol;
    productObj.starDensity = star.st_lbol;
    productObj.starRadius = star.st_rad;
    productObj.starMetallicity = star.st_metratio;
    productObj.starDistance = star.st_dist;

    const product = await new Product(productObj).save();
    store.products.push(product);
    await store.save();
  })

  return 'Stars created';
}

const getSpaceships = {
  method: "GET",
  url:
    "https://swapi.co/api/starships"
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
  const nSuff = ["", "mk V", "mk IV", "mkIII", "mkI", "", "v.1", "v.4", "v.8", "type 2"];
  const company = ["Proto-HyperLander v.5.1.4", "Quantum Stancion ", "Alfa-Twinn ", "antidelimiter", "HMS Gloriana ", "Providence ", "Cosmic Typhoon ", "Starbreaker ", "BraneBender ", "ShippyMcShipFace "]

  await asyncForEach(spaceships, async (ship) => {
    const name = "";
    const productObj = {};
    productObj.name = name.concat(company.pop()).concat(nSuff.pop());
    productObj.price = parseInt(ship.cost_in_credits) || Math.floor((Math.random() * 99999999999999) + 100000000000);
    productObj.capacity = parseInt(ship.passengers) || Math.ceil((Math.random() * 5382) + 3);
    productObj.description = ship.starship_class;
    productObj.mass = Math.ceil((Math.random() * 3000) + 3);
    productObj.volume = Math.ceil((Math.random() * 2000) + 200);
    productObj.category = "spaceship";
    productObj.store = storeId;
    productObj.image = images.pop();
    productObj.productionTime = Math.ceil((((productObj.mass - 3) / 2997) * 1000) + 50);
    productObj.cargoVolume = Math.ceil(((productObj.volume * 60) / 100) * 1000);
    productObj.maxAcc = Math.ceil((Math.random() * 200) + 10);
    productObj.maneuverability = Math.ceil(((productObj.maxAcc - 10) / 200) * 360);

    const product = await new Product(productObj).save();
    store.products.push(product);
    await store.save();
  })

  return "Spaceships created";
}

const getSpacesuits = {
  method: "GET",
  url:
    "https://swapi.co/api/species"
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
  let count = 0;
  const names = ["Normadon", "Franimal", "Reformation", "SunSwell", "StreamWalker", "Euclid", "Curie", "Void", "Echo", "Obsidian"]
  await asyncForEach(spacesuits, async (suit) => {
    const productObj = {};
    productObj.name = "The " + names.pop() + " Suit";
    productObj.price = Math.ceil((Math.random() * 9999) + 500);
    productObj.description = "Protects against the dangers of space"
    productObj.mass = Math.ceil((Math.random() * 99) + 7);
    productObj.volume = Math.ceil((((productObj.mass - 7) / 99) * 100) + 7);
    productObj.color = suit.colors || 'black';
    productObj.category = "spacesuit";
    productObj.store = storeId;
    productObj.image = images.pop();
    productObj.o2Vol = Math.ceil((Math.random() * 80) + 7);
    productObj.vacExposure = Math.ceil(productObj.o2Vol * 73)

    const product = await new Product(productObj).save();
    store.products.push(product);
    await store.save();
  })

  return "Spacesuits created";
}

async function seedFoods(storeId) {
  const preparationMethods = [ 
    ['', false],
    ['Freeze Dried ', true],
    ['Liquidated ', true],
    ['Vaporized ', false],
    ['Quantum Chilled ', true],
    ['Flash Statis ', false]
  ];

  const cuis = [
    ['', false],
    ['Salpetrian', true],
    ['Antediluvian', true],
    ['Heteroglomulous', false],
    ['Frechnyan', true],
    ['Ocjdular', false]
  ];

  let foods;
  let images = foodImg;
  await axios(getFood).then(res => {
    // console.log(res.data.results.length || "UH OH!");
    foods = res.data.results.slice(0, 10);
  })

  let store;
  await Store.findById(storeId).then(foundStore => {
    store = foundStore;
  })

  await asyncForEach(foods, async (food) => {
    const sample = Math.ceil(Math.random() * 5);
    const prep = preparationMethods[sample][0];
    const lG = preparationMethods[sample][1];
    const lC = cuis[sample][0];
    
    const productObj = {};
    productObj.name = prep + food.title;
   
    productObj.mass = Math.ceil(Math.random() * 500);
    productObj.volume = Math.ceil(Math.random() * 278);
    productObj.price = Math.ceil((productObj.mass / productObj.volume) * 7.43);
    productObj.description = food.ingredients;
    productObj.category = 'food';
    productObj.store = storeId;
    productObj.cuisine = lC;
    productObj.storageMethod = prep;
    productObj.labGrown = lG;
    productObj.image = images.pop();

    const product = await new Product(productObj).save();
    store.products.push(product);
    await store.save();
  })

  return "Foods liquidated and compressed"
}



module.exports = {
  seedExoplanets,
  seedStars,
  seedSpaceships,
  seedSpacesuits,
  seedFoods
}