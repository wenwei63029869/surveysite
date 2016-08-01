var models = require("../models")
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  if (!res.locals.admin) {
    res.redirect('/login');
  } else {
    models.Question.findAll({
      include: [models.Answer]
    })
    .then(function(questions) {
      res.render('admin/dashboard', {
        questions: questions,
        admin: res.locals.admin
      });
    });
  };
});

router.post('/login', function(req, res) {
  models.Admin.findOne({ where: {email: req.body.email }})
  .then(function(admin) {
    if (!admin) {
      res.render('home/login', { error: 'Invalid email or password.' });
    } else {
      if (req.body.password === admin.password) {
        req.session.admin = admin;
        res.redirect('/admins');
      } else {
        res.render('home/login', { error: 'Invalid email or password.' });
      }
    }
  });
});

router.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/');
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
