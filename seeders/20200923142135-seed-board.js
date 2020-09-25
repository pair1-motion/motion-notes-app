'use strict';
const fs = require("fs")


module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let data = fs.readFileSync("./dataseed/boards.json")
   data = JSON.parse(data)
   data = data.map( Element => {
     let newData = {
       name: Element.name,
       cover_img: Element.cover_img,
       description: Element.description,
       createdAt: new Date(),
       updatedAt: new Date()
     }
     return newData

   })
   return queryInterface.bulkInsert('Boards', data, {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Boards', null, {})
  }
};
