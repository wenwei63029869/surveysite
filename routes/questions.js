var models  = require('../models');
var Promise = require("bluebird");
var express = require('express');
var router = express.Router();


router.get('/:question_id/success', function(req, res) {
  models.Question.findOne({
    where: {id: parseInt(req.params.question_id)},
    include: [models.Answer]
  })
  .then(function(question) {
    question.getAnswers()
    .then(function(answers){
      res.render('question/question_success', {
        question: question,
        answers: answers
      });
    });
  });
})

router.get('/new', function(req, res) {
  res.render('question/new_question');
});

router.post('/:question_id/submitted', function(req, res) {
  findUserQuestion(req.body, req.params)
  .then(function(){
    console.log("finish updating userQuestion status");
    req.session.submitted = "true";
    res.redirect('/');
  })
  .catch(function(err) {
    console.error(err);
    res.status(500);
  });
});

var findUserQuestion = function(opt, params) {
  return models.UserQuestions.findOne({
    where: {
      UserId: opt.userId,
      QuestionId: params.question_id
    }
  })
  .then(function(userQuestion) {
    if (!userQuestion) {
      throw new Error("userQuestion fails to be found");
    };
    return models.Answer.findOne({
      where: {id: opt.answer}
    }).
    then(function(answer) {
      return updateAnswer(userQuestion, answer)
    });
  });
};

var updateAnswer = function(userQuestion, answer) {
  return answer.update({
        counter: answer.counter + 1
      })
      .then(function(){
        return userQuestion.update({
          status: "Answered"
        });
      });
};

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
  createQuestion(req.body).then(function(question) {
    res.redirect("/questions/" + question.id + "/success");
  }, function(err) {
    res.render('questions/new', {
      error: err.message
    });
  }).catch(function(err) {
    console.error(err);
    res.status(500);
  });
});

function createQuestion(opts) {
  return models.Question.create({
    content: opts.question
  })
  .then(function(question) {
    if (!question) {
      throw new Error("Question \"#{opts.question}\" fails to be created");
    }
    // Update the new question to each user
    return Promise.all([
      models.User.findAll()
      .then(function(users) {
        users.forEach(function(user) {
          user.addQuestion(question)
        });
      }),
      Promise.map(opts.answers, function(answer){
        return createAndAddToQuestion(question, answer)
      })
    ]).return(question);
  });
}

function createAndAddToQuestion(question, answer) {
  return models.Answer.create({
    content: answer
  })
  .then(function(ans) {
    if (!ans) {
      throw new Error("Answer \"#{answer}\" fails to be created");
    }
    return question.addAnswer(ans);
  })
  .then(function(){
    console.log("done adding a answer to the question");
  });
}
;
module.exports = router;
