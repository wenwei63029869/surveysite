'use strict';
module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define('Question', {
    content: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Question.hasMany(models.Answer)
        Question.belongsToMany(models.User, {
          through:models.UserQuestions,
          foreignKey: 'QuestionId'
        })
      }
    }
  });
  return Question;
};