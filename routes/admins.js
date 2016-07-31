var models = require("../models")
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  models.Question.findAll({
    include: [models.Answer]
  })
  .then(function(questions) {
    res.render('dashboard', {
      questions: questions
    });
  });
});

// Make a route to delete a question

router.post('/login', function(req, res) {
  models.Admin.findOne({ where: {email: req.body.email }})
  .then(function(admin) {
    if (!admin) {
      res.render('error', { error: 'Invalid email or password.' });
    } else {
      if (req.body.password === admin.password) {
        res.redirect('/admins');
      } else {
        res.render('error', { error: 'Invalid email or password.' });
      }
    }
  });
});

router.post('/create', function(req, res) {
  models.Admin.create({
    email: req.body.email,
    password: req.body.password
  }).then(function() {
    res.redirect('/admins');
  });
});

module.exports = router;
