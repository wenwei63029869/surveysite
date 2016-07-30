'use strict';
module.exports = function(sequelize, DataTypes) {
  var userQuestion = sequelize.define('userQuestion', {
    answerId: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return userQuestion;
};