const Product = require("../models/Product");
const axios = require('axios');

const seedProducts = data => {
  switch(data.category) {
    case "exopanet":
      seedExoplanets();
  }
}

const seedExoplanets = async => {
  
}




// // const createProduct = async data => {
// //   const newProduct = new Product(data);
// //   switch (data.category) {
// //   case ('exoplanet'):
    
  
    
  
  
// //   }
// //   return newProduct.save();
// // }

// const createExoplanet = () => {
// // insert apis
// }


// const login = async data => {

//   try {
//     const {
//       message,
//       isValid
//     } = validateLoginInput(data);

//     if (!isValid) {
//       throw new Error(message);
//     }
//   } catch (err) {
//     throw err;
//   }

//   const {
//     email,
//     password
//   } = data

//   const currentUser = await User.findOne({
//     email
//   });

//   if (!currentUser) {
//     throw new Error("User does not exist");
//   };

//   const validPassword = await bcrypt.compareSync(password, currentUser.password)

//   if (!validPassword) {
//     throw new Error("invalid credentials");
//   };

//   const token = jwt.sign({
//     id: currentUser._id
//   }, keys.secretOrKey);

//   return {
//     token,
//     loggedIn: true,
//     ...currentUser._doc,
//     password: null
//   };
// };


// module.exports = {
//   createProduct
// };