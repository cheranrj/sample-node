const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./config/db");
const authRoute = require("./routes/authRoute");

dotenv.config();
const cors = require("cors");
const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

//API Route declaration
app.use("/api/auth", authRoute);

//Global error handler
app.use((err, req, res, next) => {
  console.log("Global error msg", error);
  res.status(500).send("Something went wrong");
});

//DB connection success
// Start express server
dbConnection
  .query("SELECT 1")
  .then((data) => {
    console.log("connection success", data);
    app.listen(port, () => console.log("server started at 3000"));
  })
  .catch((error) => console.log("DB connection failed" + error));

// app.listen(port, () => {
//   console.log(`Server running on port: ${port}`);
// });
