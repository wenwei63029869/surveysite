var models  = require('../models');
var express = require('express');
var router = express.Router();


router.get('/success', function(req, res) {
  models.Question.findAll()
  .then(function(questions) {
    questions[questions.length-1].getAnswers().then(function(answers){
      console.log(answers)
    })
  })
})

router.get('/new', function(req, res) {
  res.render('new_question')
});

router.post('/create', function(req, res) {
  console.log(req.body)
  models.Question.create({
    content: req.body.question
  })
  .then(function(question) {
    req.body.answers.forEach(function(answer) {
      models.Answer.create({
        content: answer
      }).then(function(ans) {
        console.log(question)
        question.addAnswers(ans)
      });
    });
    res.redirect("/questions/success")
  });
})

module.exports = router;
