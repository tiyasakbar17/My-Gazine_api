const { author, bookmark, post } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { failedResponse, successResponse } = require("../responses");

module.exports = {
	register: async (req, res) => {
		const { email, password } = req.body;
		try {
			const schema = Joi.object({
				name: Joi.string().min(2).required(),
				email: Joi.string().min(5).email().required(),
				password: Joi.string().min(6).required(),
			});

			const { error } = schema.validate({ ...req.body }, { abortEarly: false });

			if (error) {
				return failedResponse(res, error.details[0].message, await error.details.map((detail) => detail.message));
			} else {
				const checkEmail = await author.findOne({
					where: {
						email,
					},
				});

				if (checkEmail) {
					failedResponse(res, "Use Another Email");
				} else {
					const hashedPassword = await bcrypt.hash(password, 10);
					const newUserData = {
						...req.body,
						password: hashedPassword,
					};
					const newUser = await author.create(newUserData);

					const tokenPayload = {
						id: newUser.id,
						email: newUser.email,
					};

					const token = await jwt.sign(tokenPayload, process.env.SECRET_KEY, {
						expiresIn: 86400,
					});

					const showResult = {
						email: newUser.email,
						token,
					};
					return successResponse(res, showResult, "user", "Account Registered", 201);
				}
			}
		} catch (error) {
			console.log("something went wrong at register======>>>>>>", error);
			return failedResponse(res, error);
		}
	},
	login: async (req, res) => {
		const { email, password } = req.body;
		try {
			const schema = Joi.object({
				email: Joi.string().min(5).email().required(),
				password: Joi.string().min(6).required(),
			});

			const { error } = schema.validate({ ...req.body }, { abortEarly: false });

			if (error) {
				return failedResponse(res, error.details[0].message, await error.details.map((detail) => detail.message));
			}
			const calledUser = await author.findOne({
				where: {
					email,
				},
			});
			const validatingPassword = await bcrypt.compare(password, calledUser.password);

			if (!calledUser || !validatingPassword) {
				return failedResponse(res, "Check Your Email Or Password");
			} else {
				const userId = {
					id: calledUser.id,
					email: calledUser.email,
				};
				jwt.sign(
					userId,
					process.env.SECRET_KEY,
					{
						expiresIn: 86400,
					},
					(error, token) => {
						if (error) {
							return failedResponse(res, JSON.stringify(error));
						} else {
							const resultToSend = {
								email,
								token,
							};
							return successResponse(res, resultToSend, "account");
						}
					}
				);
			}
		} catch (error) {
			return failedResponse(res, "Check Your Email Or Password");
		}
	},
	loadData: async (req, res) => {
		try {
			const calledUser = await author.findOne({
				where: { id: req.user.id },
				attributes: {
					exclude: ["createdAt", "updatedAt", "password", "token"],
				},
			});
			successResponse(res, calledUser, "account", "account data loaded");
		} catch (error) {
			console.log("Something went wrong at loadData =====>>>>>", error);
			failedResponse(res, error);
		}
	},
	handlerBookmark: async (req, res) => {
		try {
			const { id: author_id } = req.user;
			const { id: post_id } = req.params;
			const checkAvail = await bookmark.findOne({
				where: {
					author_id,
					post_id,
				},
			});
			if (!checkAvail) {
				const result = await bookmark.create({ author_id, post_id });
				if (!result) {
					return failedResponse(res, "Server Error");
				}
				return successResponse(res, "Marked", "result", "post saved");
			}
			const deletes = await bookmark.destroy({
				where: {
					author_id,
					post_id,
				},
			});
			if (!deletes) {
				return failedResponse(res, "Server Error");
			}
			successResponse(res, "Un-Marked", "result", "post removed from saved");
		} catch (error) {
			failedResponse(res, error);
		}
	},
};
