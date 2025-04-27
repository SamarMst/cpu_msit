const express = require('express');
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require("./routes");
app.use("/", routes);


const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
  });
  