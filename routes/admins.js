var models = require("../models")
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('dashboard')
});

router.post('/login', function(req, res) {
  console.log("body: ", req.body.email)
  models.Admin.findOne({ where: {email: req.body.email }})
  .then(function(admin) {
    console.log(admin)
    if (!admin) {
      res.render('error', { error: 'Invalid email or password.' });
    } else {
      if (req.body.password === admin.password) {
        console.log("found admin")
        res.redirect('/admins');
      } else {
        res.render('error', { error: 'Invalid email or password.' });
      }
    }
  });
});

router.post('/create', function(req, res) {
  console.log("body: ", req.body)
  models.Admin.create({
    email: req.body.email,
    password: req.body.password
  }).then(function() {
    console.log("New Admin is created")
    res.redirect('/admins');
  });
});

module.exports = router;
