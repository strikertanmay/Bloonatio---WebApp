const router = require('express').Router();

function authCheck(req,res,next){
  if(req.user === undefined ){
    res.redirect('/auth/login');
  }
  else{
    next();
  }
}

router.get('/',authCheck ,function (req, res) {
  res.render('dashboard',{data : req.user,aa : 0,ab : 0,ac : 0,ad: 0});
});

module.exports = router;
