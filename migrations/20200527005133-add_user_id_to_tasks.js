'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
	  // relacion uno a muchos
	  // "tasks" en sequelize no hay problema pero postgres si
	  // pasa a Tasks
	return queryInterface.addColumn("Tasks", "userId", {
		type: Sequelize.INTEGER,
		references: {
			model: {
				tableName: "Users"
			}, // "User", // como cambié en el modelo User por Users
			key: "id"
		}
	})
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
	  // "tasks" en sequelize no hay problema pero postgres si
	  // pasa a Tasks
	return queryInterface.removeColumn("Tasks", "userId");
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
