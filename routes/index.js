var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Question.findAll({
    include: [ models.Answer ]
  }).then(function(questions) {
    console.log(questions[0].Answers)
    res.render('index', {
      title: 'Express',
      questions: questions
    });
  });
});

module.exports = router;
