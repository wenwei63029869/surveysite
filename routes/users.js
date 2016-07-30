var models = require("../models")
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/user', function(req, res) {
  res.send('get all the users');
});

router.post('/create', function(req, res) {
  console.log("body: ", req.body)
  models.User.create({
    username: req.body.username,
    password: req.body.password
  }).then(function() {
    console.log("New user is created")
    res.redirect('/');
  });
});

module.exports = router;
