require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./api/router");
const bodyParser = require("body-parser");

//PORT
const port = process.env.PORT || 5000;

const app = express();

// for passing cors
app.use(cors());
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTER To Api
app.use("/api/v1", router);
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => {
	console.log(`Server are running on port ${port}`);
});
