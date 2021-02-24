"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("authors", [
			{
				name: "Tiyas Akbar",
				email: "tiyas@gmail.com",
				password: "$2b$10$7hbN2PKBlaHUyovbm0fvL.GCG/y0X1Cxg5iuxI.gB9Ke9bI9haeDK",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Andre Siga",
				email: "andre@gmail.com",
				password: "$2b$10$7hbN2PKBlaHUyovbm0fvL.GCG/y0X1Cxg5iuxI.gB9Ke9bI9haeDK",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
