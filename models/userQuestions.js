'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserQuestions = sequelize.define('UserQuestions', {
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserQuestions;
};