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
    origin: "https://short-urlsv.vercel.app", // or 5173 if you use Vite
    credentials: true,
  })
);
app.use(express.json());

const urlRoute = require("./routes/urlRoutes");

app.use("/api", urlRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
