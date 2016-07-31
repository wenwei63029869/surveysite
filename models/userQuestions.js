'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserQuestions = sequelize.define('UserQuestions', {
  }, {
    classMethods: {
      associate: function(models) {
        UserQuestions.belongsTo(models.Answer, {foreignKey: 'AnswerId'})
      }
    }
  });
  return UserQuestions;
};