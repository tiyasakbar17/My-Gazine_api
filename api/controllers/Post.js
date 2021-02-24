const Joi = require("joi");
const { post, author, comment, bookmark } = require("../../models");
const { failedResponse, successResponse } = require("../responses");

module.exports = {
	addPost: async (req, res) => {
		try {
			const {
				body,
				files: { image },
				user: { id },
			} = req;

			const schema = Joi.object({
				author_id: Joi.number().required(),
				title: Joi.string().required(),
				image: Joi.string().required(),
				body: Joi.string().required(),
			});

			const { error } = schema.validate({ ...body, author_id: id, image: image[0].filename }, { abortEarly: false });

			if (error) {
				return failedResponse(
					res,
					error.details[0].message,
					error.details.map((detail) => detail.message)
				);
			}

			const newPost = await post.create({
				...body,
				author_id: id,
				image: image[0].filename,
			});

			if (!newPost) {
				return failedResponse(res, "Something went wrong when adding post");
			}

			successResponse(res, "success", "post", "article published");
		} catch (error) {
			console.log("someting went wrong at addPost=====>>>>>", error);
			failedResponse(res, error);
		}
	},

	getPosts: async (req, res) => {
		try {
			const calledPosts = await post.findAll({
				attributes: {
					exclude: ["updatedAt author_id"],
				},
				include: [
					{
						model: author,
						as: "author",
						attributes: ["name", "id"],
					},
				],
				order: [["createdAt", "DESC"]],
			});
			if (!calledPosts) {
				failedResponse(res, "no post found");
			}
			successResponse(res, calledPosts, "posts", "Post Loaded");
		} catch (error) {
			console.log("something went wrong at getPosts", error);
			failedResponse(res, error);
		}
	},

	getPostById: async (req, res) => {
		try {
			const calledPost = await post.findOne({
				where: {
					id: req.params.id,
				},
				attributes: {
					exclude: ["updatedAt"],
				},
				include: [
					{
						model: author,
						as: "author",
						attributes: ["name", "id"],
					},
					{
						model: comment,
						as: "comments",
						attributes: {
							exclude: ["updatedAt"],
						},
						order: [["createdAt", "DESC"]],
					},
					{
						model: bookmark,
						as: "bookmarks",
						attributes: ["author_id"],
					},
				],
			});
			if (!calledPost) {
				failedResponse(res, "no post found");
			}
			successResponse(res, calledPost, "post", "Post Loaded");
		} catch (error) {}
	},

	editPost: async (req, res) => {
		const { id } = req.params;
		const {
			body,
			user: { id: u_id },
		} = req;
		try {
			const schema = Joi.object({
				title: Joi.string(),
				body: Joi.string(),
			});

			const { error } = schema.validate({ ...body }, { abortEarly: false });

			if (error) {
				return failedResponse(
					res,
					error.details[0].message,
					error.details.map((detail) => detail.message)
				);
			}

			const calledPost = await post.findOne({
				where: { id },
			});

			if (calledPost.author_id !== u_id) {
				return failedResponse(res, "edit your own article");
			}

			const newPost = await post.update(
				{
					...body,
				},
				{ where: { id } }
			);

			if (!newPost) {
				return failedResponse(res, "failed to edit post, please try again");
			}
			successResponse(res, "edited", "post", "Post is updated");
		} catch (error) {
			console.log("something went weong at edit post =====>>>>>", error);
			failedResponse(res, error);
		}
	},

	deletePost: async (req, res) => {
		const { id } = req.params;
		try {
			const calledPost = await post.findOne({ where: { id } });

			if (calledPost.author_id !== req.user.id) {
				return failedResponse(res, "you can anly detele your oun post");
			}

			const deletedPost = await post.destroy({ where: { id } });

			if (!deletedPost) {
				return failedResponse(res, "can't delete the post, please try again");
			}

			successResponse(res, "deleted", "post", "post deleted");
		} catch (error) {
			console.log("something went wrong at delete post ======>>>>>>", error);
			failedResponse(res, error);
		}
	},

	getSavedPosts: async (req, res) => {
		try {
			const calledPosts = await bookmark.findAll({
				where: {
					author_id: req.user.id,
				},
				attributes: ["id"],
				include: [
					{
						model: post,
						as: "posts",
						attributes: {
							exclude: ["updatedAt"],
						},
						include: [
							{
								model: author,
								as: "author",
								attributes: ["name"],
							},
						],
						order: [["createdAt", "DESC"]],
					},
				],
				order: [["createdAt", "DESC"]],
			});
			if (!calledPosts) {
				failedResponse(res, "no post found");
			}
			const returns = calledPosts.map((post) => post.posts);
			successResponse(res, returns, "posts", "Post Loaded");
		} catch (error) {
			console.log(error);
			failedResponse(res, error);
		}
	},
};
