const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");
const connectdb = require("./config/db");
const userRoutes = require("./routes/userRouter");
const noteRoutes = require("./routes/noteRouter");

const { notFound, errorHandler } = require("./Middlewares/errorMiddleware");

const app = express();
dotenv.config();
connectdb();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
////// Deployment///////
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.send(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is running");
  });
}
app.use(notFound);
app.use(errorHandler);
const port = 4000;

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
