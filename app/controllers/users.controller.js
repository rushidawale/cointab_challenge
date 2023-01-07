const { json } = require("express");
const User = require("../models/users.model.js");
const axios = require('axios');

// Create and Save a new user
exports.create = async(req, res,next) => {
  try{
    const numberofUser = req.query.count || 50;
    const url = `https://randomuser.me/api/?results=${numberofUser}`
    let api = await axios({
      url,
      method: 'get',
      timeout: 8000,
      headers: {
          'Content-Type': 'application/json',
      }
  })
  let response = api.data.results
    for(let user of response){
      // Create a user
      const newuser = new User({
        ID : Math.floor((Math.random() * 100000) + 1),
        first_name : user.name.first,
        last_name : user.name.last,
        gender : user.gender,
        email : user.email,
        phone : user.phone
      });
    // Save user in the database
      await User.create(newuser)
    }
  
    return res.status(201).json({message:'Successfully inserted'})
  }catch(error){
    next(new Error(`Error ${error}`))
  }
};

// Retrieve all users from the database (with condition).
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    else res.send({ message: `All users were deleted successfully!` });
  });
};
