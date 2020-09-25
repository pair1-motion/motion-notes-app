'use strict'
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Board, { 
        through: models.UserBoard
        // foreignKey: "UserId",
        // as: 'User'
      })
    }
  };
  User.init({
    uname: DataTypes.STRING,
    email: DataTypes.STRING,
    pw: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance, opt) => {
        let salt = bcrypt.genSaltSync(5)
        let pwHash = bcrypt.hashSync(instance.pw, salt)
        instance.pw = pwHash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};