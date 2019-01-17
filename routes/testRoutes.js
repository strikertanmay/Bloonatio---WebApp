// Router
const router = require('express').Router();

//Database
const mongoose = require('mongoose');
const Bank = require('../models/bank');
const User = require('../models/user');
const Donor = require('../models/donor');

//App tester
router.get('/display', function (req, res) {
  res.render('display');
  console.log(mongoose.connection.collections);
  Bank.find({}).then(function(result){
    console.log(result);
  });
  User.find({}).then(function(result){
    console.log(result);
  });
  Donor.find({}).then(function(result){
    console.log(result);
  });
});

//App deleter
router.get('/delete', function (req, res) {
  res.render('delete');
  mongoose.connection.collections.users.drop(function(){
    console.log("deleted");
  });
  mongoose.connection.collections.donors.drop(function(){
    console.log("deleted");
  });
  mongoose.connection.collections.banks.drop(function(){
    console.log("deleted");
  });
});

module.exports = router;
