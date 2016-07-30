'use strict';
module.exports = function(sequelize, DataTypes) {
  var userQuestions = sequelize.define('userQuestions', {
  }, {
    classMethods: {
      associate: function(models) {
        userQuestions.belongsTo(models.Answer)
      }
    }
  });
  return userQuestions;
};