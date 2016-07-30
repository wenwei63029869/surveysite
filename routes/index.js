var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  models.Question.findAll({
    include: [ models.Answer ]
  }).then(function(questions) {
    res.render('index', {
      title: 'Express',
      questions: questions
    });
  });
});

router.post('/login', function(req, res) {
  models.User.findOne({ email: req.body.username }, function(err, user) {
    if (!user) {
      res.render('/', { error: 'Invalid email or password.' });
    } else {
      if (req.body.password === user.password) {
        console.log("found user")
        res.send("successfully login")
        // res.redirect('/dashboard');
      } else {
        res.render('/', { error: 'Invalid email or password.' });
      }
    }
  });
});

module.exports = router;
