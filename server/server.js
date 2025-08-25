const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const database = require("./config/db");

const PORT = process.env.PORT || 4000;
dotenv.config();
database.connect();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "https://short-urlsv.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());

const urlRoute = require("./routes/urlRoutes");

app.use("/api", urlRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
