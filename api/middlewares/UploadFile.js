const multer = require("multer");
const md5 = require("md5");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const { failedResponse } = require("../responses");

cloudinary.config({
	cloud_name: process.env.CNAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

exports.uploadFile = (image) => {
	let streamUpload = (buffer) => {
		return new Promise((resolve, reject) => {
			let stream = cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
				if (result) {
					resolve(result);
				} else {
					reject(error);
				}
			});

			streamifier.createReadStream(buffer).pipe(stream);
		});
	};

	//UPLOAD
	const loopImages = async (req, next) => {
		try {
			if (req.files.image) {
				let result = await streamUpload(req.files.image[0].buffer);
				req.files.image[0] = {
					...req.files.image[0],
					filename: result.url,
				};
			}
			return next();
		} catch (error) {
			console.log(error);
		}
	};

	//Seleksi extension file
	const fileFilter = (req, file, cb) => {
		if (file.fieldname === image) {
			const fileType = /jpeg|jpg|png|gif|svg/;
			if (!fileType.test(path.extname(file.originalname).toLowerCase())) {
				req.errorMessege = {
					message: "Wrong Type of File",
				};
				return cb(new Error("Wrong Type of File"), false);
			}
		}
		cb(null, true);
	};

	//Upload Multer
	const upload = multer({
		// storage,
		fileFilter,
		limits: {
			fileSize: 5242880, //(Mb) => 5 x 1024 x 1024
		},
	}).fields([{ name: image, maxCount: 1 }]);

	return (req, res, next) => {
		upload(req, res, (error) => {
			if (req.errorMessege) {
				return failedResponse(res, req.errorMessege.message);
			}
			if (error) {
				if (error.code === "LIMIT_FILE_SIZE") {
					return failedResponse(res, "The file must be less than 5 Mb");
				}
			}
			return loopImages(req, next);
		});
	};
};
