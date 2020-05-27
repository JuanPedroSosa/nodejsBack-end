'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tasks', [
		{id:1, description: "Grabar curso", createdAt: new Date(), updatedAt: new Date()},
		{id:2, description: "Editar curso", createdAt: new Date(), updatedAt: new Date()},
		{id:3, description: "Subir video", createdAt: new Date(), updatedAt: new Date()}
      ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('tasks', null, {});

  }
};
