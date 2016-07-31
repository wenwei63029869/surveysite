var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.ip)
  res.render('index')
  // models.User.findOne({ where: {ip: req.ip }})
  // .then(function(user){
  //   if (!user)
  // })
  // models.Question.findAll({
  //   include: [ models.Answer ]
  // }).then(function(questions) {
  //   res.render('index', {
  //     title: 'Express',
  //     questions: questions
  //   });
  // });
});

router.get('/login', function(req,res) {
  res.render('login')
})

module.exports = router;
