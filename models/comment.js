"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class comment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			comment.belongsTo(models.author, { foreignKey: "author_id", as: "author" });
			comment.belongsTo(models.post, { foreignKey: "post_id", as: "post" });
		}
	}
	comment.init(
		{
			post_id: DataTypes.INTEGER,
			author_id: DataTypes.INTEGER,
			comment: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "comment",
		}
	);
	return comment;
};
