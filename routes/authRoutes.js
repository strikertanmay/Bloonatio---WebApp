// Router
const router = require('express').Router();

// Middleware
var bodyParser = require('body-parser');
var urlEncodedParser =  bodyParser.urlencoded({extended : false});
const Bank = require('../models/bank');

// Passport
const passport = require('passport');
const customStrat = require('../config/custom');

//Registration Process
router.get('/register',function(req,res){
  res.render('register');
});

router.post('/register',urlEncodedParser,function(req,res){
  if(!req.body) return res.sendStatus(400);
  Bank.findOne({username : req.body.username}).then(function(result){
    if(result != undefined){
      console.log('Registration failed due to clash in username');
      res.redirect('/auth/register');
    } else {
      console.log(req.body);
      var newBank = new Bank({
        name : req.body.name ,
        username : req.body.username ,
        password : req.body.password ,
        number : parseInt(req.body.number),
        address : req.body.address,
        city : req.body.city,
        userCount : 0,
        donorCount : 0,
        bloodQuantity : 0,
        donors : [],
        users : []
      });
      newBank.save().then(function(){
        res.redirect('/auth/login');
      });
    }
  });
});

//Login Process
router.get('/login',function(req,res){
  res.render('login');
});

router.post('/login',urlEncodedParser,passport.authenticate('custom', { failureRedirect: '/auth/login' }),function(req,res){
  if(!req.body) return res.sendStatus(400);
  res.redirect('/dashboard');
});

router.get('/logout',function(req,res){
  req.logout();
  console.log('Logging out');
  res.redirect('/auth/login');
});

module.exports = router;
