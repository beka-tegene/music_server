const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const songs = require("./server/router/router");
const connectDB = require("./server/database/connection");
const cors = require("cors");
const app = express();

dotenv.config({ path: ".env" });
const PORT = process.env.PORT;

connectDB();

app.use(cors());
app.use(express.json());


app.use(bodyParser.urlencoded({extended: true }));

app.use("/", songs);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
