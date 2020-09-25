'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Board.hasMany(models.Note),
      Board.belongsToMany(models.User, { through: models.UserBoard })
    }
  };
  Board.init({
    name: DataTypes.STRING,
    cover_img: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};