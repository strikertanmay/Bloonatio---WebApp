//Express
var express = require('express');
var app = express();
//Middleware
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
//View Engine
app.set('view engine', 'ejs');
//Database
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/bloonatio"
//Static files
app.use('/assets', express.static(__dirname + '/assets'));

//Actual Code

//Get requests  

//App tester
app.get('/display', function (req, res) {
  res.render('display');
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("banks").find({}).toArray(function (err, result) {
      if (err) throw err;
      console.log("BLOOD BANKS");
      console.log(result);
      db.close();
    });
    dbo.collection("donors").find({}).toArray(function (err, results) {
      if (err) throw err;
      console.log("DONORS");
      console.log(results);
      db.close();
    });
    dbo.collection("users").find({}).toArray(function (err, results) {
      if (err) throw err;
      console.log("USERS");
      console.log(results);
      db.close();
    });
  });
});

//App deleter
app.get('/delete', function (req, res) {
  res.render('delete');
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("banks").drop(function (err, delOK) {
      if (err) throw err;
      if (delOK) console.log("Collection deleted");
      db.close();
    });
    dbo.collection("donors").drop(function (err, delOK) {
      if (err) throw err;
      if (delOK) console.log("Collection deleted");
      db.close();
    });
    dbo.collection("users").drop(function (err, delOK) {
      if (err) throw err;
      if (delOK) console.log("Collection deleted");
      db.close();
    });
  });
});

app.get('/delete', function (req, res) {
  res.render('delete');
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("users").drop(function (err, delOK) {
      if (err) throw err;
      if (delOK) console.log("Collection deleted");
      db.close();
    });
  });
});

//Index page
app.get('/index', function (req, res) {
  if (searchtran == 1) {
    res.render('index', {
      data: "Your blood has been DONATED"
    });
  } else if (searchtran == 0) {
    res.render('index', {
      data: "Your blood is yet to be donated"
    });
  } else {
    res.render('index', {
      data: undefined
    });
  }
});

//Register page
app.get('/register', function (req, res) {
  res.render('register');
}); //Done

//Login page
app.get('/login', function (req, res) {
  res.render('login');
}); //Done

//Dashboard page
app.get('/dashboard', function (req, res) {
  var a = 0,
    b, c;
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("donors").find({}).toArray(function (err, result) {
      if (err) throw err;
      c = result.length;
      result.forEach(function (item) {
        a += 1;
      });
      dbo.collection("users").find({}).toArray(function (err, results) {
        if (err) throw err;
        b = results.length;
        var d = b / (b + c);
        d *= 100;
        res.render('dashboard', {
          data: dat,
          ab: b,
          ac: c,
          aa: a,
          ad: d
        });
        db.close();
      });
      db.close();
    });
  });
}); //incomplete

//Add Donor page
app.get('/donor', function (req, res) {
  res.render('donor', {
    login: dat
  });
}); //Done

//Add User page
app.get('/user', function (req, res) {
  res.render('user', {
    login: dat
  });
}); //Done

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
var searchtran;
app.post('/transactions', urlEncodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var obj = {
    donor_id: ""
  };
  obj.donor_id = req.body.tranid;
  console.log(obj);
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("users").find(obj).toArray(function (err, result) {
      if (err) throw err;
      if (result[0] != undefined) {
        searchtran = 1;
      } else {
        searchtran = 0;
      };
      res.redirect('/index');
      db.close();
    });
  });
});

//Register form
app.post('/register', urlEncodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var obj = {
    name: "",
    uname: "",
    pass: "",
    cdets: "",
    address: "",
    city: "",
    uc: 0,
    dc: 0,
    bq: 0
  };
  obj.name = req.body.name;
  obj.uname = req.body.uname;
  obj.pass = req.body.pass;
  obj.cdets = req.body.cdets;
  obj.address = req.body.address;
  obj.city = req.body.city;
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("banks").insertOne(obj, function (err, result) {
      if (err) throw err;
      console.log("Blood Bank Added");
      res.redirect('/login');
      db.close();
    });
  });
});

//Login form
var dat;
app.post('/login', urlEncodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var obj = {
    uname: req.body.uname
  };
  var pass = req.body.pass;
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("banks").find(obj).toArray(function (err, result) {
      if (err) throw err;
      if (result[0] != undefined) {
        if (result[0].pass == pass) {
          console.log("Successful Login");
          dat = result[0];
          console.log(dat);
          res.redirect('/dashboard');
        } else {
          console.log("Unsuccessful Attempt");
          res.redirect('/login');
        }
      }
      db.close();
    });
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

//Add User form
app.post('/adduser', urlEncodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var obj = {
    fname: "",
    lname: "",
    bgroup: "",
    donor_id: "",
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
  var objr = {
    bgroup: req.body.bgroup,
    city: req.body.city
  };
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery;
    dbo.collection("donors").find(objr).toArray(function (err, result) {
      if (err) throw err;
      myquery = result[0];
      console.log(result[0]);
      obj.donor_id = myquery._id.toString();
      dbo.collection("users").insertOne(obj, function (err, res) {
        if (err) throw err;
        console.log("User Added");
        db.close();
      });
      dbo.collection("donors").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        db.close();
      });
      db.close();
    });
    res.redirect('/user_details');
  });
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