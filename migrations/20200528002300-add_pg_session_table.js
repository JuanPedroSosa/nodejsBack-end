'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
	return queryInterface.createTable('session', {
		sid: {
			type: Sequelize.STRING,
			primaryKey: true,
		},
		sess: {
			type: Sequelize.JSON
		},
		expires: {
			allowNull: false,
			type: "TIMESTAMP"
		}
	});


    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
	return queryInterface.dropTable('session');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
