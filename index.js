const express = require("express");
const app = express();
const userRouter = require("./src/routes/userRoutes");
const noteRouter = require("./src/routes/noteRoutes");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
  res.send("Notes API Created by @codeguyakash!");
});
const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
