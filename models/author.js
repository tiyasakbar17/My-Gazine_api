"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class author extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			author.hasMany(models.post, {
				foreignKey: "author_id",
				as: "posts",
			});
			author.hasMany(models.comment, {
				foreignKey: "author_id",
				as: "comments",
			});
			author.hasMany(models.bookmark, {
				foreignKey: "author_id",
				as: "bookmarks",
			});
		}
	}
	author.init(
		{
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "author",
		}
	);
	return author;
};
