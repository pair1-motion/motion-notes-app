'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all ([
      queryInterface.addConstraint('UserBoards', {
        fields: ['BoardId'],
        type: 'foreign key',
        name: 'custom_fkey_BoardId',
        references: { //Required field
          table: 'Boards',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('UserBoards', {
        fields: ['UserId'],
        type: 'foreign key',
        name: 'custom_fkey_UserId',
        references: { //Required field
          table: 'Users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all ([
      queryInterface.removeConstraint('UserBoards', 'BoardId', {}),
      queryInterface.removeConstraint('UserBoards', 'UserId', {})
    ])
  }
}