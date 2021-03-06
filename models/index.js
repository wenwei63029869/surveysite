'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

var checkConnection = function(sequelize) {
  sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });
};

if (config.use_env_variable) {
  var sequelize = new Sequelize(
    process.env[config.use_env_variable],
    {
      pool: {
      max: 5,
      min: 0,
      maxIdleTime: 120000
      }
    }
  );
  checkConnection(sequelize);
} else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      dialect: config.dialect,
      pool: {
      max: 5,
      min: 0,
      maxIdleTime: 120000
      }
  });
  checkConnection(sequelize);
};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  };
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
