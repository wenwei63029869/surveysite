var models = require("../models")
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  // res.send('login in');
  console.log("body: ", req.body.email)
  models.Admin.findOne({ where: {email: req.body.email }})
  .then(function(admin) {
    console.log(admin)
    if (!admin) {
      res.render('/', { error: 'Invalid email or password.' });
    } else {
      if (req.body.password === admin.password) {
        console.log("found admin")
        res.send("successfully login")
        // res.redirect('/dashboard');
      } else {
        res.render('/', { error: 'Invalid email or password.' });
      }
    }
  });
});

router.post('/create', function(req, res) {
  console.log("body: ", req.body)
  res.send("successful")
  models.Admin.create({
    email: req.body.email,
    password: req.body.password
  }).then(function() {
    console.log("New Admin is created")
    res.redirect('/');
  });
});

module.exports = router;
