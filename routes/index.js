var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  if (req.session && (req.session.admin || req.session.submitted)) {
    res.render('home/index');
  };
  findUser(req)
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
            res.render('home/index');
          };
          var question = pickQuestion(questions);
          user.addQuestions(questions);
          res.render('home/index', {
            question: question,
            answers: question.Answers
          });
        });
      });
    } else {
      var questions = user.Questions
      if (questions.length === 0) {
        res.render('home/index');
      } else {
        var question = pickQuestion(questions)
        question.getAnswers()
        .then(function(answers) {
          res.render('home/index', {
            question: question,
            answers: answers,
            userId: user.id
          });
        });
      };
    };
  });
});

var findUser = function(opt) {
  return models.User.findOne({
    where: { ip: opt.ip },
    include: [{
      model: models.Question,
      through: { where:{ status: null } }
    }]
  });
};

var pickQuestion = function(questions) {
  return questions[Math.floor(Math.random()*questions.length)];
};

router.get('/login', function(req,res) {
  res.render('home/login');
});

module.exports = router;
