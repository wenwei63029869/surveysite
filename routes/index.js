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
  console.log(req.body)
  res.send('respond with a resource');
});

module.exports = router;
