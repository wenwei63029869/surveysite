var models  = require('../models');
var Promise = require("bluebird");
var express = require('express');
var router = express.Router();


router.get('/success', function(req, res) {
  models.Question.findOne({
    where: {id: parseInt(req.query.question_id)},
    include: [models.Answer]
  })
  .then(function(question) {
    question.getAnswers().then(function(answers){
      res.render('question_success', {
        question: question,
        answers: answers
      });
    });
  });
})

router.get('/new', function(req, res) {
  res.render('new_question');
});

router.post('/:question_id/submitted', function(req, res) {
  console.log("userId: ", req.body.userId);
  console.log("question id: ", req.params.question_id);
  models.UserQuestions.findOne({
    where: {
      UserId: req.body.userId,
      QuestionId: req.params.question_id
    }
  })
  .then(function(userQuestion) {
    if (!userQuestion) {
      res.send("Can't find userQuestion")
    };
    models.Answer.findOne({
      where: {id: req.body.answer}
    }).
    then(function(answer) {
      answer.update({
        counter: answer.counter + 1
      })
      .then(function(){
        userQuestion.update({
          status: "Answered"
        })
        .then(function(){
          res.render('index')
        });
      });
    });
  });
});

router.get('/:question_id/destroy', function(req, res) {
  models.Question.destroy({
    where: {
      id: req.params.question_id
    }
  }).then(function() {
    res.redirect('/admins');
  });
});

router.post('/create', function(req, res) {
  models.Question.create({
    content: req.body.question
  })
  .then(function(question) {
    if (!question) {
      res.render('questions/new', {
          error: "Question \"#{req.body.question}\" fails to be created"
        });
    } else {
      // Update the new question to each user
      models.User.findAll()
      .then(function(users) {
        users.forEach(function(user) {
          user.addQuestion(question)
        });
      });
      Promise.map(req.body.answers, function(answer){
        return createAndAddToQuestion(question, answer, res)
      })
      .done(function(){
        console.log('finished')
        res.redirect("/questions/success/?question_id=" + question.id);
      });
    };
  })
})

var createAndAddToQuestion = function(question, answer, res) {
  models.Answer.create({
    content: answer
  })
  .then(function(ans) {
    if (ans) {
      return question.addAnswer(ans).then(function() {
        console.log('done')
      })
    } else {
      res.render('questions/new', {
        error: "Answer \"#{answer}\" fails to be created"
      });
    };
  });
}

module.exports = router;
