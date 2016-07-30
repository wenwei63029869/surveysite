'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    ip: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Question, {
          through:models.userQuestions
        })
      }
    }
  });
  return User;
};