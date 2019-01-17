//Express
var express = require('express');
var app = express();

//Middleware
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });

//View Engine
app.set('view engine', 'ejs');

//Database
const mongoose = require('mongoose');
const Keys = require('./config/keys');
mongoose.connect(Keys.mongodb.bdURI,{useNewUrlParser : true});

mongoose.connection.once('open',function(){
  console.log("Connected");
}).on('error',function(error){
  console.log('Error : ' ,error);
});

// Passport
const passport = require('passport');
const cookieSession = require('cookie-session');

app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys : [Keys.session.cookeey]
}));

app.use(passport.initialize());
app.use(passport.session());

//Static files
app.use('/assets', express.static(__dirname + '/assets'));

//Routes
var authRoutes = require('./routes/authRoutes');
app.use('/auth',authRoutes);
var testRoutes = require('./routes/testRoutes');
app.use('/test',testRoutes);
var dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/dashboard',dashboardRoutes);
var addUserRoutes = require('./routes/addUserRoutes');
app.use('/addUser',addUserRoutes);

//Actual Code

//Get requests

//Index page
app.get('/', function (req, res) {
  if(req.query.status === undefined){
    res.render('index', {
      data: undefined
    });
  }
  else if (req.query.status.localeCompare('true')) {
    res.render('index', {
      status: "Your blood has been DONATED"
    });
  } else if (req.query.status.localeCompare('false')) {
    res.render('index', {
      status: "Your blood is yet to be donated"
    });
  } else {
    res.send('hola');
  }
});

//Search page
app.get('/searchit', function (req, res) {
  if (searched == undefined) {
    res.render('search');
    console.log("1");
  }
}); //Done

//Searched
app.get('/searched', function (req, res) {
  if (searched != undefined) {
    /*MongoClient.connect(url,{useNewUrlParser : true}, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var obj = searched[0].bbank;
      dbo.collection("donors").find(obj).toArray(function(err, result) {
        if (err) throw err;
        searched = result;
        res.redirect('/searched');
        db.close();
      });
    });*/ //this is ongoing
    res.render('searched', {
      data: searched
    });
    console.log(searched[0]);
  }
}); //incomplete

//Donor Details page
app.get('/donor_details', function (req, res) {
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var obj = dat.uname;
    dbo.collection("donors").find(obj).toArray(function (err, result) {
      if (err) throw err;
      res.render('donor_details', {
        data: result,
        login: dat
      });
      db.close();
    });
  });
}); //Done

//User Details page
app.get('/user_details', function (req, res) {
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var obj = dat.uname;
    dbo.collection("users").find(obj).toArray(function (err, result) {
      if (err) throw err;
      res.render('user_details', {
        data: result,
        login: dat
      });
      db.close();
    });
  });
}); //Done

//Overall Details page
app.get('/trans', function (req, res) {
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var obj = dat.uname;
    dbo.collection("users").find(obj).toArray(function (err, result) {
      if (err) throw err;
      dbo.collection("donors").find(obj).toArray(function (err, results) {
        if (err) throw err;
        res.render('trans', {
          data: result,
          da: results,
          login: dat
        });
        db.close();
      });
      db.close();
    });
  });
}); //Done


//Post requests

//Index Form
app.post('/transactions', urlEncodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  Donor.findOne({_id : req.body.transactionid}).then(function(result){
    res.send('found ya');
  });
});

//Add Donor form
app.post('/adddonor', urlEncodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var obj = {
    fname: "",
    lname: "",
    bgroup: "",
    mno: "",
    ano: "",
    address: "",
    city: "",
    mail: "",
    bq: "",
    bbank: dat.uname
  };
  obj.fname = req.body.fname;
  obj.lname = req.body.lname;
  obj.bgroup = req.body.bgroup;
  obj.mno = req.body.mno;
  obj.ano = req.body.ano;
  obj.address = req.body.address;
  obj.city = req.body.city;
  obj.mail = req.body.mail;
  obj.bq = req.body.bq;
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("donors").insertOne(obj, function (err, res) {
      if (err) throw err;
      console.log("Donor Added");
      db.close();
    });
  });
  res.redirect('/donor_details');
});
//Search form
var searched;
app.post('/search', urlEncodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var obj = {
    bgroup: req.body.bgroup,
    city: req.body.city
  };
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery;
    dbo.collection("donors").find(obj).toArray(function (err, result) {
      if (err) throw err;
      searched = result;
      res.redirect('/searched');
      db.close();
    });
  });
});

//Initiate App

var server = app.listen(process.env.PORT || '8080', function () {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});
