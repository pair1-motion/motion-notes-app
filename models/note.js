'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Note.belongsTo(models.Board)
    }

    static convertDate (date) {
      return date.toDateString()
    }

    static noteStats(note) {
      let wordCount = note.split(' ').length
      let charCount = note.length
      return `Note Statistics: ${wordCount} words, ${charCount} characters`
    }

    getCreatedDate () {
      let tanggal = (this.dataValues.createdAt).toISOString().split("T")
      return `Tanggal: ${tanggal[0]} at ${tanggal[1]}`
    }

  };
  Note.init({
    note: DataTypes.STRING,
    cover_img: DataTypes.STRING,
    BoardId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Note',
  });
  return Note;
};