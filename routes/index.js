var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  models.User.findOne({
    where: { ip: req.ip },
    include: [{
      model: models.Question,
      through: { where:{ status: null } }
    }]
  })
  .then(function(user){
    if (!user) {
      models.User.create({
        ip: req.ip
      })
      .then(function(user) {
        models.Question.findAll({
          include: [models.Answer]
        })
        .then(function(questions) {
          if (questions.length === 0) {
            res.render('index');
          }
          var question = questions[Math.floor(Math.random()*questions.length)]
          user.addQuestions(questions);
          res.render('index', {
            question: question,
            answers: question.Answers
          });
        });
      });
    } else {
      var questions = user.Questions
      if (questions.length === 0) {
        res.render('index')
      } else {
        var question = questions[Math.floor(Math.random()*questions.length)]
        question.getAnswers()
        .then(function(answers) {
          res.render('index', {
            question: question,
            answers: answers,
            userId: user.id
          });
        });
      };
    };
  });
});

router.get('/login', function(req,res) {
  res.render('login')
})

module.exports = router;
