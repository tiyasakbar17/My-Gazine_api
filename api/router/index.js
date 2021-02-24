const { login, register, loadData, handlerBookmark } = require("../controllers/Auth");
const { addPost, getPosts, getPostById, editPost, deletePost, getSavedPosts } = require("../controllers/Post");
const { jwtAuth } = require("../middlewares/JwtRoleAuth");
const { uploadFile } = require("../middlewares/UploadFile");

const router = require("express").Router();

//** Author Auth **//
router.post("/login", login);
router.post("/register", register);
router.get("/load", jwtAuth, loadData);

//** BOOKMARK **//
router.post("/bookmark/:id", jwtAuth, handlerBookmark);
router.get("/bookmarks", jwtAuth, getSavedPosts);

//** POST **//
router.post("/post", jwtAuth, uploadFile("image"), addPost);
router.get("/posts", getPosts);
router.get("/post/:id", getPostById);
router.patch("/post/:id", jwtAuth, editPost);
router.delete("/post/:id", jwtAuth, deletePost);

module.exports = router;
