"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class post extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			post.belongsTo(models.author, { foreignKey: "author_id", as: "author" });
			post.hasMany(models.comment, { foreignKey: "post_id", as: "comments" });
			post.hasMany(models.bookmark, { foreignKey: "post_id", as: "bookmarks" });
		}
	}
	post.init(
		{
			title: DataTypes.STRING,
			body: DataTypes.TEXT,
			author_id: DataTypes.INTEGER,
			image: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "post",
		}
	);
	return post;
};
