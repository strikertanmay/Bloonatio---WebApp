// Router
const router = require('express').Router();

//Database
const Bank = require('../models/bank');
const User = require('../models/user');
const Donor = require('../models/donor');

//Middleware
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });

//Add User page
router.get('/', function (req, res) {
  res.render('user', {
    login: req.user
  });
});
//Add User form
router.post('/', urlEncodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  Donor.findOne({bloodGroup : req.body.bloodGroup,city: req.body.city}).then(function(result){
    var newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      bloodGroup: req.body.bloodGroup,
      number: parseInt(req.body.number),
      aadhar: req.body.aadhar,
      address: req.body.address,
      city: req.body.city,
      email: req.body.email,
      bloodQuantity: parseInt(req.body.bloodQuantity),
      donor : result,
      bank_id : req.user._id
    });
  });
  newUser.save().then(function(){
    res.redirect('/user_details');
  });
});

module.exports = router;
